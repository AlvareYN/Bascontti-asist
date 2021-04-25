<script>
    import { onMount } from "svelte";
    import { authUser } from "../../../stores";
    import DashboardLayout from "../../_components/DashboardLayout.svelte";
    import Loader from "../../_components/utils/Loader.svelte";
    import Redirect from "../../_components/utils/Redirect.svelte";
    onMount(() => {
        authUser.authenticate();
    });
</script>

{#if $authUser === false}
    <Loader />
{:else if $authUser === null}
    <Redirect path={'/registros/auth'} />
{:else}
    <DashboardLayout>
        <slot />
    </DashboardLayout>
{/if}
