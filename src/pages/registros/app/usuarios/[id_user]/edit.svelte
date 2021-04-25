<script>
  import CrudUser from "../../../../_components/utils/CrudUser.svelte";
  export let id_user;
</script>

<CrudUser type={"edit"} {id_user} />
