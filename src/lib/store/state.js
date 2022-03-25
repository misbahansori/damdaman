import { writable } from "svelte/store";

export const activePawn = writable({
    x : null,
    y : null,
    color : null
});