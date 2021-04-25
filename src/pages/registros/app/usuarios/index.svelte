<script>
  import { goto } from "@roxi/routify";
  import { db } from "../../../../firebase";

  import { generalData } from "../../../../stores";
  import UserCard from "../../../_components/utils/UserCard.svelte";
  const editUser = (e) => {
    let user = e.detail;
    $goto(`./${user.id}/edit`);
  };
  const removeUser = async (e) => {
    let user = e.detail;
    let response = confirm("¿estas seguro que quieres eliminar este usuario?");
    try {
      if (response) {
        await db.collection("Trabajadores").doc(user.id).delete();
        generalData.update((data) => {
          let index = data.findIndex((userStore) => userStore.id === user.id);
          data.splice(index, 1);
          return data;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const viewUserInfo = (e) => {
    console.log(e);
    let user = e.detail;
    $goto(`./${user.id}/view`);
  };
  const addNewUser = () => {
    $goto("./nuevo");
  };
</script>

<div class="container-bascontti">
  <div class="grid">
    {#each $generalData as user}
      <UserCard
        {user}
        on:edit={editUser}
        on:remove={removeUser}
        on:view={viewUserInfo}
      />
    {/each}

    <UserCard editCard={true} on:addNewUser={addNewUser} />
  </div>
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2.5rem;
  }
</style>
