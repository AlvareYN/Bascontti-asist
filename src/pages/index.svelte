<script>
  import FloweredConered from "./_components/FloweredConered.svelte";
  import { goto } from "@roxi/routify";
</script>

<div class="container-index">
  <FloweredConered />
  <div class="middle">
    <div class="text">
      <p class="titulo bold">Bienvenido a</p>
    </div>
    <div class="logo">
      <img src="/images/logo.svg" alt="logo bascontti" />
    </div>
    <div class="buttons">
      <button
        on:click={() => {
          $goto("./asistencia");
        }}>Asistencia</button
      >
      <button
        on:click={() => {
          $goto("./registros/auth");
        }}>Dashboard</button
      >
    </div>
  </div>
</div>

<style lang="scss">
  @media only screen and (max-width: 700px) {
    .buttons {
      grid-template-columns: 1fr !important;
      grid-template-rows: 1fr 1fr;
    }
    img {
      width: 200px;
    }
  }

  .container-index {
    position: relative;
    background-color: white;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    .middle {
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
        }
        button:hover {
          border-width: 3px;
        }
      }
    }
  }
</style>
