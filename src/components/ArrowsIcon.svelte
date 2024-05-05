<script lang="ts">
    export let fromCur: string;
    export let toCur: string;

    function handleClick() {
        let c = fromCur;
        fromCur = toCur;
        toCur = c;
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.code === "Space" || e.code === "Enter") handleClick();
    }
</script>

<svg
    width="77"
    height="67"
    viewBox="0 0 77 67"
    fill="#F0F0F4"
    xmlns="http://www.w3.org/2000/svg"
    class={$$props.class}
    on:click={handleClick}
    on:keydown={handleKeydown}
    role="button"
    tabindex="0"
>
    <path
        d="M57.0393 0V9.50655H9.50655C4.27795 9.50655 0 13.7845 0 19.0131V28.5196H9.50655V19.0131H57.0393V28.5196L76.0524 14.2598L57.0393 0ZM19.0131 38.0262L0 52.286L19.0131 66.5458V57.0393H66.5458C71.7744 57.0393 76.0524 52.7613 76.0524 47.5327V38.0262H66.5458V47.5327H19.0131V38.0262Z"
    />
</svg>

<style>
    svg {
        fill: var(--text);
    }

    @media (hover: hover) {
        svg:hover {
            fill: color-mix(in srgb, var(--text) 70%, var(--background));
        }
    }
    @media (hover: none) {
        svg:active {
            fill: color-mix(in srgb, var(--text) 70%, var(--background));
        }
    }
</style>
