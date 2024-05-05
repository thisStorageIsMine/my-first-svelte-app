<script lang="ts">
    import CalcSide from "./CalcSide.svelte";
    import ArrowsIcon from "./ArrowsIcon.svelte";
    import { currencyStore } from "../store/store";

    let fromCur = $currencyStore.base_code,
        toCur = "USD";

    let fromCurAmount = 1;
    let toCurAmount = $currencyStore.conversion_rates[toCur] * fromCurAmount;

    $: {
        toCurAmount = $currencyStore.conversion_rates[toCur] * fromCurAmount;
        // fromCurAmount = $currencyStore.conversion_rates[fromCur];
    }
</script>

<main>
    <CalcSide
        header="Откуда"
        bind:fromCur
        bind:toCur
        bind:fromCurAmount
        bind:toCurAmount
    />

    <ArrowsIcon bind:fromCur bind:toCur />

    <CalcSide
        header="Куда"
        bind:fromCur={toCur}
        bind:toCur={fromCur}
        bind:fromCurAmount={toCurAmount}
        bind:toCurAmount={fromCurAmount}
    />
</main>

<style>
    main {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: min(100%, 1240px);
        margin: 0 auto;
    }

    @media (max-width: 850px) {
        main {
            flex-direction: column;

            gap: 40px;
        }
    }
</style>
