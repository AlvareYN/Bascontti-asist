<script>
  import { params } from "@roxi/routify";
  import { onMount } from "svelte";
  import { db } from "../../firebase";
  import Loader from "../_components/utils/Loader.svelte";
  export let scoped = {};
  export let scopedSync = {};
  if (scoped || scopedSync) {
  }
  import { goto } from "@roxi/routify/runtime/helpers";
  import { addAttendanceDashboard } from "../../firebaseUtils";
  let type;
  let select = 1;
  let personas = false;
  let comentario = "";
  let pannel = 0;
  let user = false;

  $: type = $params.type;
  const enviar = (id) => {
    comentario = comentario.replace(/(\r\n|\n|\r)/gm, "");
    let now = new Date();
    now.setMilliseconds(0);
    now.setSeconds(0);
    let obj = {
      id: select,
      comentario: comentario,
      fecha: now.getTime(),
      tipo: type,
      id: id,
    };
    let result = addAttendanceDashboard(obj);
    if (result) {
      comentario = "";
      pannel = 2;
    }
  };
  onMount(async () => {
    let query = await db.collection("Trabajadores_vista").get();
    if (!query.empty) {
      let tempArray = [];
      query.forEach((doc) => {
        tempArray.push({ ...doc.data(), id: doc.id });
      });
      personas = tempArray;
    } else {
      alert = true;
    }
  });
</script>

{#if personas === false}
  <Loader />
{:else}
  <div class="middle">
    <div
      class="regreso"
      on:click={() => {
        if (pannel === 0) {
          $goto("/asistencia");
        } else if (pannel === 1) {
          pannel = 0;
        }
      }}
    >
      <img src="/images/index/regreso.svg" alt="regreso" />
      &nbsp; Regresar
    </div>
    <div class="logo">
      <img src="/images/logo.svg" alt="logo bascontti" />
    </div>
    <div class="text">
      <p class=" bold">Asistencia</p>
    </div>
    {#if pannel === 0}
      <div class="content">
        <div class="header bold">Seleccione un nombre</div>
        <div class="buttons">
          {#each personas as item}
            <button
              on:click={() => {
                user = item.id;
                pannel = 1;
              }}>{item.nombre}</button
            >
          {/each}
        </div>
      </div>
    {:else if pannel === 1}
      <div class="content">
        <div class="header bold left">
          Comentario <span>(opcional)</span>:
        </div>
        <input
          type="text"
          class="comment"
          placeholder="Holi, boli bla blabl blabalal"
          bind:value={comentario}
        />
        <button
          class="bold send"
          on:click={() => {
            if (user !== false) {
              enviar(user);
            } else {
              alert("Por alguna razon el usuario no fue seleccionado");
            }
          }}>Enviar</button
        >
      </div>
    {:else if pannel === 2}
      <div class="content">
        <div class="header bold black">Se ha agregado Exitosamente</div>
        <button
          class="bold return"
          on:click={() => {
            pannel = 0;
          }}>Nueva asistencia</button
        >
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  @media only screen and (max-width: 450px) {
    .buttons {
      grid-template-columns: 1fr !important;
      grid-template-rows: 1fr 1fr;
      gap: 1.5rem !important;
      place-items: center;
    }

    .comment {
      width: 300px !important;
      min-width: 200px;
    }
  }
  .black {
    color: var(--black-text) !important;
  }
  button.return {
    color: white !important;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--black-text);
    width: 200px;
    height: 40px;
    font-family: infraSemiBold !important;
    font-size: 22px;
    font-weight: 500;
    border-radius: 100px;
    background-color: var(--red-alert);
    z-index: 0;
    border: none;
    cursor: pointer;
  }
  button.send {
    color: white !important;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--black-text);
    width: 200px;
    height: 40px;
    font-family: infraSemiBold !important;
    font-size: 22px;
    font-weight: 500;
    border-radius: 100px;
    background-color: var(--bascontti-color);
    z-index: 0;
    border: none;
    cursor: pointer;
  }
  .send:hover {
    border: 2px solid #baccfd;
  }
  .regreso {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: left;
    top: -50px;
    width: 100%;
    cursor: pointer;
  }

  .middle {
    position: relative;
    margin-top: -8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .text {
      font-size: 36px;
      z-index: 0;
    }
    .logo {
      img {
        width: 161px;
        height: 36px;
      }
      z-index: 0;
    }
    .content {
      .header {
        color: var(--no-active-text);
        font-size: 24px;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      .header.left {
        color: var(--black-text);
        span {
          color: var(--blue-bright);
        }
      }
      .comment {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--black-text);
        width: 400px;
        height: 52px;

        font-size: 16px;
        font-weight: 500;
        border-radius: 100px;
        background-color: white;
        border: 1px solid #baccfd;
        z-index: 0;
        outline: none;
        padding-left: 2rem;
        padding-right: 2rem;
      }
      .buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        button:hover {
          border-width: 3px;
        }
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--black-text);
          width: 200px;
          height: 52px;
          font-family: infraSemiBold !important;
          font-size: 22px;
          font-weight: 500;
          border-radius: 100px;
          background-color: white;
          border: 1px solid #baccfd;
          z-index: 0;
          cursor: pointer;
          img {
            height: 35px;
            width: 35px;
          }
        }
      }
    }
  }
</style>
