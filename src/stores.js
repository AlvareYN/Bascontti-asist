import { writable } from "svelte/store";
import { auth } from "./firebase";

export const authUser = writable(false);
authUser.authenticate = () => {
    auth.onAuthStateChanged(user => {
        authUser.set(user)
    })
}
export const generalData = writable([]);
export const ingreso_salida = writable([]);
export const pagos = writable([]);