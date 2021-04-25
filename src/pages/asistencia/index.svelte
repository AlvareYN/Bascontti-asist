<script>
  import { goto } from "@roxi/routify";
</script>

<div class="middle">
  <div
    class="regreso"
    on:click={() => {
      $goto("/");
    }}
  >
    <img src="/images/index/regreso.svg" alt="regreso" />
    &nbsp; Regresar
  </div>
  <div class="text">
    <p class="titulo bold">Bienvenido a</p>
  </div>
  <div class="logo">
    <img src="/images/logo.svg" alt="logo bascontti" />
  </div>
  <div class="buttons">
    <button
      on:click={() => {
        $goto("./control?type=ingreso");
      }}
      >Ingreso<img src="/images/index/ingreso.svg" alt="Ingreso" />
    </button>
    <button
      on:click={() => {
        $goto("./control?type=salida");
      }}
    >
      <img src="/images/index/salida.svg" alt="Salida" />Salida
    </button>
  </div>
</div>

<style lang="scss">
  .regreso {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: left;
    top: -100px;
    width: 100%;
    cursor: pointer;
  }
  @media only screen and (max-width: 700px) {
    .buttons {
      grid-template-columns: 1fr !important;
      grid-template-rows: 1fr 1fr;
      button {
        img {
          width: 200px;
        }
      }
    }
  }

  .middle {
    position: relative;
    margin-top: -8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .text {
      z-index: 0;
      margin-bottom: 2rem;
    }
    .logo {
      margin-bottom: 4em;
      img {
        width: 330px;
        height: 70px;
      }
      z-index: 0;
    }
    .buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--black-text);
        width: 200px;
        height: 52px;
        font-family: infraSemiBold !important;
        font-size: 24px;
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
      button:hover {
        border-width: 3px;
      }
    }
  }
</style>
