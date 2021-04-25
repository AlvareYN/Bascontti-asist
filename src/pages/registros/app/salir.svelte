<script>
    import { goto } from "@roxi/routify";

    import { onMount } from "svelte";

    import { auth } from "../../../firebase";
    const logOut = () => {
        auth.signOut();
    };
    onMount(() => {
        logOut();
        $goto("/registros/auth");
    });
</script>
