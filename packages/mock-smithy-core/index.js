// Simulates @smithy/core TypeRegistry
const registry = new Map();

export function registerError(name, constructor) {
    const existing = registry.get(name);
    if (existing && existing !== constructor) {
        console.log(`[TypeRegistry] WARNING: Overwriting ${name} registration!`);
        console.log(`  Old: ${existing.toString().slice(0, 50)}...`);
        console.log(`  New: ${constructor.toString().slice(0, 50)}...`);
    }
    registry.set(name, constructor);
}

export function createError(name, options) {
    const Constructor = registry.get(name);
    if (Constructor) {
        return new Constructor(options);
    }
    const err = new Error(options.message || `Unknown error: ${name}`);
    err.name = name;
    return err;
}

export function getErrorClass(name) {
    return registry.get(name);
}

export function getRegistrySize() {
    return registry.size;
}
