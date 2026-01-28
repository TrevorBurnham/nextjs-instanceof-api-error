# Turbopack Registry Bug

Two SDKs register different classes under the same key. The last one wins, breaking `instanceof`.

## Steps to reproduce

```bash
npm i && npm run build && npm start
curl localhost:3000/api/test   # {"ok":false,"found":true} ❌
curl localhost:3000/api/test2  # {"ok":true,"found":true}  ✅
```

## The Bug

Turbopack bundles each route into separate chunks. When multiple packages use a shared registry:

1. `sdk-a` registers its `class E` under key `"E"`
2. `sdk-b` registers its own `class E` under the same key `"E"`
3. Since both registrations happen in the same bundled registry, one overwrites the other
4. `sdk-a.fail()` throws `new E()` using sdk-a's class
5. `sdk-a.check()` looks up `"E"` from registry → gets sdk-b's class (the last one registered)
6. `instanceof` fails: sdk-a's instance is not an instance of sdk-b's class

This affects any pattern where:
- Multiple packages register classes/constructors in a shared singleton registry
- The same key is used across packages (e.g., error names like `"AccessDeniedException"`)
- Code throws instances of one class but checks against a registry-retrieved class

Real-world example: AWS SDK v3 / Smithy's `TypeRegistry` in `@smithy/core`.

## Fix
```js
// next.config.ts
serverExternalPackages: ["registry"]
```

For AWS SDK:
```js
serverExternalPackages: ["@smithy/core"]
```

This prevents the registry from being bundled, ensuring a single shared instance at runtime.
