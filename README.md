# Next.js/Turbopack instanceof Bug Reproduction

This repository demonstrates a bug in Next.js/Turbopack where `instanceof` checks fail for error classes when using a shared registry pattern.

## The Bug

When using SDK-style packages that:
1. Use a shared registry pattern (like Smithy's TypeRegistry) for error class registration
2. The registry package is bundled (not externalized)
3. Multiple routes import from the same SDK package

The `instanceof` check can fail because Turbopack creates separate copies of the registry module in each route chunk, causing class identity to be lost.

## Root Cause Analysis

The issue occurs because:
1. The registry module (e.g., `@smithy/core` containing `TypeRegistry`) gets duplicated into each route chunk
2. Each chunk has its own `Map` instance for storing registered classes
3. Error classes registered in one chunk are not visible in other chunks
4. When an error is created via the registry in one chunk and checked via `instanceof` in another chunk, the class identity doesn't match

## Reproduction

This repo demonstrates the issue with a mock SDK setup:
- `mock-smithy-core`: Simulates `@smithy/core` with a TypeRegistry
- `mock-sdk-client` and `mock-sdk-client-b`: Simulate SDK clients that register errors

### Steps

1. `npm install`
2. `npm run build`
3. `npm run start`
4. Visit `/api/route-1` (uses client A) - may show `isInstanceOf: true`
5. Visit `/api/route-6` (uses client B) - may show `isInstanceOf: false`

## Workaround

Add the registry package to `serverExternalPackages` in `next.config.js`:

\`\`\`js
module.exports = {
  serverExternalPackages: ["mock-smithy-core"],
};
\`\`\`

For AWS SDK / Smithy-based packages, add `@smithy/core`:

\`\`\`js
module.exports = {
  serverExternalPackages: [
    "@smithy/middleware-stack",
    "@smithy/smithy-client",
    "@smithy/core",  // <-- Add this to fix instanceof issues
  ],
};
\`\`\`

This forces the package to be loaded from `node_modules` at runtime instead of being bundled, ensuring a single registry instance.

## Related

This issue affects:
- AWS SDK v3 clients using Smithy TypeRegistry
- Internal Amazon packages (`@amzn/basin-*`) that use traditional multi-file CJS builds
- Any package using a singleton registry pattern for class registration

## Technical Details

The Smithy TypeRegistry pattern:
1. SDK schemas register error classes: `TypeRegistry.for(namespace).registerError(schema, ErrorClass)`
2. During response deserialization, errors are created via: `registry.getErrorCtor(schema)`
3. User code checks: `error instanceof ErrorClass`

When the registry is duplicated:
- Registration happens in chunk A's registry
- Lookup happens in chunk B's registry (empty or different)
- `instanceof` fails because the classes are different objects
