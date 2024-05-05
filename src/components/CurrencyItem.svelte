<script lang="ts">
    import { currencyStore } from "../store/store";
    import { getCurrency } from "../service/currencyService";
    import { toggleButtonsInert } from "../utils/toggleButtonsInert";

    export let currency: string;
    export let fromCur: string;
    export let toCur: string;
    export let activeCur: string;

    $: active = activeCur === currency;

    function changeActiveCur(elem: HTMLElement) {
        function throttleChangeCur(ms: number) {
            // "Торможение" - благодоря этой штуке мы ограничим активацию функции
            // Пригодится, когда будем делать запросы на сервер
            let isThrotling = false;

            function wrapper(e: MouseEvent | KeyboardEvent) {
                if (isThrotling) return;

                const target = e.target as HTMLElement;

                // Если мы кликнули на валюту, что выбрана другой
                // Меняем их местами
                if (target.innerText === toCur) {
                    toCur = fromCur;
                    fromCur = target.innerText;

                    return;
                }

                fromCur = target.innerText;

                // Важные момент
                // Делать запрос на сервер надо только если ни одна из выбранных валют не совпадает с валютой,
                // рейтинги которой мы брали из сервера в последний раз
                if (
                    $currencyStore.base_code !== fromCur &&
                    $currencyStore.base_code !== toCur
                ) {
                    // Если делаем запрос на сервер
                    getCurrency(fromCur).then((data) =>
                        currencyStore.set(data),
                    );
                    // Активируем "торможение" и делаем инертными кнопки переключения валюты
                    isThrotling = true;
                    toggleButtonsInert(true);

                    // Убираем инертность кнопок
                    setTimeout(() => {
                        isThrotling = false;
                        toggleButtonsInert(false);
                    }, ms);
                }
            }

            return wrapper;
        }

        const throttledChangeCur = throttleChangeCur(450);

        function handleClick(e: MouseEvent) {
            throttledChangeCur(e);
        }

        function handleKeydown(e: KeyboardEvent) {
            if (e.code === "Space" || e.code === "Enter") {
                throttledChangeCur(e);
            }
        }

        elem.addEventListener("click", handleClick);
        elem.addEventListener("keydown", handleKeydown);

        return {
            destroy: () => {
                elem.removeEventListener("click", handleClick);
                elem.removeEventListener("keydown", handleKeydown);
            },
        };
    }
</script>

<div
    class={`cur-item ${active && "active"} ${$$props.class}`}
    role="button"
    tabindex="0"
    use:changeActiveCur
>
    {currency}
</div>

<style>
    .cur-item {
        border: 1px solid var(--background);
        width: 100%;
        width: 85px;
        height: 40px;

        font-weight: 400;
        font-size: 16px;
        color: var(--background);
        background-color: var(--text);

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
    }

    @media (hover: hover) {
        .cur-item:hover {
            background: color-mix(in srgb, var(--text) 70%, var(--background));
        }
    }

    @media (hover: none) {
        .cur-item:active {
            background: color-mix(in srgb, var(--text) 70%, var(--background));
        }
    }

    .active {
        color: var(--text);
        background-color: var(--background);

        border-color: var(--text);

        pointer-events: none;
    }
</style>
