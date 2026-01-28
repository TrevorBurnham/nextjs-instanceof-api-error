# Turbopack Registry Pattern Test

Tests whether Turbopack correctly deduplicates singleton registry modules.

## Structure

- `registry` - Shared singleton with a `Map` for class registration
- `sdk` - Registers `MyError` class, creates errors via registry
- `sdk2` - Also registers `MyError` class, checks errors via registry

## Test

```bash
npm install && npm run build && npm start
curl http://localhost:3000/api/test
```

## Expected Result

`{"match":true,"found":true}` - The registry is shared, so `instanceof` works.

## Potential Issue

If Turbopack duplicates the registry module across chunks, each chunk gets its own `Map`, causing:
- `found: true` but `match: false` (wrong class in registry)
- Or `found: false` (empty registry in checker's chunk)

## Workaround

If the bug manifests, add the registry to `serverExternalPackages`:

```js
// next.config.ts
serverExternalPackages: ["registry"]  // or "@smithy/core" for AWS SDK
```
