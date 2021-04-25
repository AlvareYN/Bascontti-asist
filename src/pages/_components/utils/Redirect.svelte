<script>
    import { onMount } from "svelte";
    import { goto } from "@roxi/routify";
    export let path;
    onMount(() => {
        $goto(path);
    });
</script>
