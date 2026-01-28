# Next.js Turbopack Class Duplication Bug

This repository demonstrates a bug in Next.js's Turbopack bundler where the same class is duplicated across multiple route chunks, causing `instanceof` checks to fail.

## The Bug

When using Turbopack (the default bundler in Next.js 15+), classes from external packages are duplicated in each route's bundle instead of being shared. This causes `instanceof` checks to fail when:

1. Route A throws an error of type `AccessDeniedException`
2. Route B catches the error and checks `error instanceof AccessDeniedException`
3. The check fails because Route A and Route B have **different copies** of the `AccessDeniedException` class

## Reproduction

```bash
npm install
npm run build
```

Then inspect the build output:

```bash
# Each route has its own copy of the class
grep -c "class e extends d.ServiceException" .next/server/app/api/*/route.js
```

Output:
```
.next/server/app/api/test/route.js:1
.next/server/app/api/test2/route.js:1
```

## Expected Behavior

The `AccessDeniedException` class should be bundled once in a shared chunk and imported by both routes, ensuring `instanceof` checks work correctly.

## Actual Behavior

Each route gets its own copy of the class definition, making them different JavaScript objects. Since `instanceof` compares object identity, checks fail across routes.

## Workaround

Add the package to `serverExternalPackages` in `next.config.ts`:

```ts
const nextConfig = {
  serverExternalPackages: ["my-sdk"],
};
```

This forces Next.js to use Node.js's native `require()` instead of bundling, ensuring a single class instance.

## Package Structure

The `my-sdk` package uses a multi-file CommonJS structure (similar to AWS SDK clients):

```
packages/my-sdk/
├── package.json
└── dist-cjs/
    ├── index.js           # Re-exports from models/
    └── models/
        ├── ServiceException.js
        └── errors.js      # Defines AccessDeniedException
```

## Environment

- Next.js 15.5.10
- Node.js 20+
- macOS / Linux
