<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let { mode = "summer" }: { mode: String } = $props();

    let container: HTMLDivElement;

    import * as Scene from "../three/scene";
    import { Mode } from "../three/types";

    const observer = new ResizeObserver(() => {
        onResize();
    });

    function onResize() {
        try {
            Scene.resize(container);
        } catch (error) {
            console.log("Couldn't resize", error);
        }
    }

    onMount(() => {
        try {
            const canvas = Scene.createScene(container);
            container.appendChild(canvas);
            Scene.startAnimationLoop();
            observer.observe(container);
        } catch (error) {
            console.log("Couldn't create Scene", error);
        }
    });

    onDestroy(() => {
        try {
            observer.disconnect();
            window.removeEventListener("resize", onResize);
            Scene.clear();
        } catch (error) {
            console.log("Couldn't destroy Scene", error);
        }
    });

    $effect(() => {
        try {
            if (mode === "summer") Scene.changeMode(Mode.Summer);
            else if (mode === "winter") Scene.changeMode(Mode.Winter);
        } catch (error) {
            console.log("Couldn't change mode", error);
        }
    });
</script>

<div bind:this={container}></div>

<style>
    div {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
