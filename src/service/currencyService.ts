import type { ICurrency } from "../interfaces/currency";


// Получить отношения валют и прочее по названию валюты
async function getCurrency(currency: string): Promise<ICurrency> {
    const response = await fetch(
        `https://v6.exchangerate-api.com/v6/56355af8d164b326bfa6b763/latest/${currency}`,
    );

    return await response.json()
}

export { getCurrency };