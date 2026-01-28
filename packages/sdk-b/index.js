import { set, get } from "registry";
class E extends Error {}
set("E", E);
export const fail = () => { throw new E("B"); };
export const check = (e) => ({ ok: e instanceof (get("E") || Object), found: !!get("E") });
