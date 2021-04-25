<script>
    
    import { onMount } from "svelte";
    import { authUser } from "../../../stores";
    import Loader from "../../_components/utils/Loader.svelte";
    import Redirect from "../../_components/utils/Redirect.svelte";
    onMount(() => {
        authUser.authenticate();
    });
</script>

{#if $authUser === null}
    <main>
        <slot />
    </main>
{:else if $authUser === false}
    <Loader />
{:else}
    <Redirect path={'/registros/app'} />
{/if}
