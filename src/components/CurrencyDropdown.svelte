<script lang="ts">
    import type { IRates } from "../interfaces/currency";
    import { getCurrency } from "../service/currencyService";
    import { currencyStore } from "../store/store";
    import { toggleButtonsInert } from "../utils/toggleButtonsInert";

    export let rates: IRates;
    export let chosenCurrensies: string[];
    export let fromCur: string;
    export let toCur: string;

    $: filteredRates = Object.keys(rates).filter(
        (cur) => !chosenCurrensies.includes(cur),
    );

    let showDropdown: boolean = false,
        dropdownBtn: HTMLElement,
        dropdownBtnArrow: SVGSVGElement;

    // Открывает список валют
    function showMenu(elem: HTMLElement) {
        function showMenu(e: MouseEvent | KeyboardEvent) {
            e.stopPropagation();
            const target = e.target as HTMLElement;

            if (
                dropdownBtn.contains(target) ||
                dropdownBtnArrow.contains(target)
            ) {
                showDropdown = !showDropdown;
                return;
            }

            showDropdown = false;
        }

        function handleClick(e: MouseEvent) {
            showMenu(e);
        }

        function handleKeydown(e: KeyboardEvent) {
            if (e.code === "Space" || e.code === "Enter") {
                showMenu(e);
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

    // При клике на валюту из меню будем добавлять эту валюту в Switcher
    function changeTemporaryCurrency(elem: HTMLElement) {
        function changeTemporaryCurrency(e: MouseEvent | KeyboardEvent) {
            const target = e.target as HTMLElement;
            const clickedCurrency = target.closest(".dropdown__item"); // Валюта на которую кликаем

            if (!clickedCurrency) return;

            // Если вдруг мы выбрали валюту, которая активна в другом calcSide
            // То надо поменять их местами
            if (target.innerText === toCur) {
                [toCur, fromCur] = [fromCur, toCur]; // a, b = b, a

                chosenCurrensies[chosenCurrensies.length - 1] = fromCur;
                return;
            }

            fromCur = target.innerText; // Меняем последнию валюту на выбранную
            chosenCurrensies[chosenCurrensies.length - 1] = fromCur;

            if (
                $currencyStore.base_code !== fromCur &&
                $currencyStore.base_code !== toCur
            ) {
                getCurrency(fromCur).then((data) => currencyStore.set(data));

                toggleButtonsInert(true);

                setTimeout(() => toggleButtonsInert(false), 450);
            }

            console.log($currencyStore.base_code);
        }

        function handleClick(e: MouseEvent) {
            changeTemporaryCurrency(e);
        }

        function handleKeydown(e: KeyboardEvent) {
            if (e.code === "Space" || e.code === "Enter") {
                changeTemporaryCurrency(e);
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

<svelte:window use:showMenu />

<div
    class="dropdown {showDropdown && 'dropdown-visible'}"
    tabindex="0"
    role="button"
    bind:this={dropdownBtn}
>
    <svg
        width="18"
        height="8"
        viewBox="0 0 18 8"
        xmlns="http://www.w3.org/2000/svg"
        fill="#080816"
        class="dropdown__svg"
        bind:this={dropdownBtnArrow}
    >
        <path d="M9 8L0.339745 0.499998L17.6603 0.5L9 8Z" />
    </svg>

    <div class="dropdown__menu" use:changeTemporaryCurrency>
        {#each filteredRates as curCode, i (i)}
            <div class="dropdown__item">{curCode}</div>
        {/each}
    </div>
</div>

<style>
    .dropdown {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var(--text);
        color: var(--background);

        border: 1px solid var(--background);
        width: 65px;
        height: 40px;

        border-radius: 0 4px 4px 0;

        position: relative;

        cursor: pointer;
    }

    .dropdown > .dropdown__svg {
        width: 20px;
        height: 10px;
        fill: var(--background);

        transition: rotate 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .dropdown__menu {
        position: absolute;
        top: 110%;
        left: calc(-1 * 330px + 100%);

        width: 330px;

        background-color: var(--text);

        display: none;
        grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));

        max-height: 200px;
        overflow-y: scroll;

        z-index: 100000;
    }

    .dropdown__item {
        border: none;

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
        .dropdown__item:hover {
            background: color-mix(in srgb, var(--text) 70%, var(--background));
        }
    }

    @media (hover: none) {
        .dropdown__item:active {
            background: color-mix(in srgb, var(--text) 70%, var(--background));
        }
    }

    .dropdown-visible .dropdown__menu {
        display: grid;
    }

    .dropdown-visible.dropdown {
        background-color: var(--background);
        border-color: var(--text);
    }

    .dropdown-visible > .dropdown__svg {
        rotate: 180deg;

        fill: var(--text);
    }
</style>
