# Turbopack Registry Bug

Two SDKs register different classes under the same key. The last one wins, breaking `instanceof`.

## Repro
```bash
npm i && npm run build && npm start
curl localhost:3000/api/test   # {"ok":false,"found":true} ❌
curl localhost:3000/api/test2  # {"ok":true,"found":true}  ✅
```

## Fix
```js
serverExternalPackages: ["registry"]  // or "@smithy/core"
```
