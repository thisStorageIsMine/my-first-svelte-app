<script lang="ts">
    import CurrencyItem from "./CurrencyItem.svelte";
    import CurrencyDropdown from "./CurrencyDropdown.svelte";
    import { currencyStore } from "../store/store";

    export let fromCur: string;
    export let toCur: string;

    let chosenCurrensies = ["RUB", "USD", "EUR", "PLN"];
    $: activeCur = fromCur;
</script>

<div class="currency-switcher {$$props.class}">
    <CurrencyItem
        currency={chosenCurrensies[0]}
        class="cur-item"
        bind:fromCur
        bind:toCur
        bind:activeCur
    />
    <CurrencyItem
        currency={chosenCurrensies[1]}
        class="cur-item"
        bind:fromCur
        bind:toCur
        bind:activeCur
    />
    <CurrencyItem
        currency={chosenCurrensies[2]}
        class="cur-item"
        bind:fromCur
        bind:toCur
        bind:activeCur
    />
    <CurrencyItem
        currency={chosenCurrensies[3]}
        class="cur-item"
        bind:fromCur
        bind:toCur
        bind:activeCur
    />
    <CurrencyDropdown
        rates={$currencyStore.conversion_rates}
        bind:chosenCurrensies
        bind:fromCur
        bind:toCur
    />
</div>

<style>
    div {
        display: inline-flex;
    }

    div > :global(.cur-item:first-of-type) {
        border-radius: 4px 0 0 4px;
    }

    div > :global(.cur-item:last-of-type) {
        border-radius: 0 4px 4px 0;
    }
</style>
