<script lang="ts">
    import CurrencySwitcher from "./CurrencySwitcher.svelte";
    import CurrencyInput from "./CurrencyInput.svelte";

    export let fromCur: string;
    export let toCur: string;
    export let fromCurAmount: number;
    export let toCurAmount: number;
    export let header: "Откуда" | "Куда" = "Откуда";
</script>

<section class="side">
    <h2 class="side__header">{header}</h2>

    <CurrencySwitcher class="side__switcher" bind:fromCur bind:toCur />

    <CurrencyInput
        class="side__input"
        bind:fromCur
        bind:toCur
        bind:fromCurAmount
        bind:toCurAmount
    />
</section>

<style>
    .side {
        display: flex;
        flex-direction: column;

        width: min-content;
    }

    .side__header {
        font-weight: 400;
        font-size: 16px;
        color: var(--primary);

        display: inline;
    }

    :global(.side__switcher) {
        margin-top: 5px;
    }

    :global(.side__input) {
        margin-top: 40px;
    }
</style>
