import { writable } from "svelte/store";
import { getCurrency } from "../service/currencyService";

// Глобальный стейт с ответом от сервера
const currencyStore = writable(await getCurrency("RUB"));

export { currencyStore }