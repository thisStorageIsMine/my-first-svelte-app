<script lang="ts">
    import { currencyStore } from "../store/store";

    export let fromCur: string;
    export let toCur: string;
    export let fromCurAmount: number;
    export let toCurAmount: number;

    // Высчитываем отношения валют
    $: ratio =
        fromCur === $currencyStore.base_code
            ? $currencyStore.conversion_rates[toCur]
            : 1 / $currencyStore.conversion_rates[fromCur];

    $: fixedRatio = `${ratio}`.substring(0, 6);

    function handleInput(elem: HTMLInputElement) {
        function cleanInput(): void {
            fromCurAmount = Math.abs(fromCurAmount); // Убрать негативные числоа
            fromCurAmount = Number(`${fromCurAmount}`.substring(0, 11)); // Обрезать

            toCurAmount = Number(`${fromCurAmount * ratio}`.substring(0, 11));
        }

        elem.addEventListener("input", cleanInput);

        return {
            destroy: () => elem.removeEventListener("input", cleanInput),
        };
    }
</script>

<label class="label {$$props.class}">
    <!--  Оказалось, input:number при вводе чего-то кроме цифр ставит своё value на пустую строку Lol -->
    <input
        type="number"
        class="label__input"
        bind:value={fromCurAmount}
        use:handleInput
    />

    <p class="label__ration">1 {fromCur} = {fixedRatio} {toCur}</p>
</label>

<style>
    .label {
        overflow: hidden;
        border: 2px solid var(--text);

        width: min(100%, 330px);
        height: 160px;

        position: relative;
    }

    .label__input {
        appearance: none;
        background-color: transparent;
        border: none;

        width: min(100%, 330px);
        height: 160px;

        color: var(--text);
        font-size: 40px;

        padding: 15px 35px;

        position: relative;
        bottom: 10px;
    }

    .label__input:focus,
    .label__input:active {
        outline: none;
        border: none;
    }

    .label__ration {
        position: absolute;

        left: 35px;
        bottom: 15px;

        z-index: 2;

        font-weight: 400;
        font-size: 14px;
        color: var(--primary);
    }

    /* Удалим стрелочки */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>
