<script>
  import { dateFormat, shortName, getHoursAndMinutos } from "../../../utils";
  import { generalData } from "../../../stores";
  import Loader from "../../_components/utils/Loader.svelte";
  let x;
  let message = "";
  let showModal = false;
</script>

<svelte:window bind:innerWidth={x} />
{#if $generalData === false}
  <Loader />
{:else}
  <div class="modal" class:is-active={showModal === true}>
    <div
      class="modal-background"
      on:click={() => {
        showModal = false;
      }}
    />
    <div class="modal-content">
      <div class="mybox">
        <div
          class="icon-close"
          on:click={() => {
            showModal = false;
          }}
        >
          <img src="/images/menu-close.svg" alt="closeIcon" />
        </div>

        <div class="titulo-container">
          <h1 class="bold titulo titulito">Comentario</h1>
        </div>
        <div class="mensaje">
          <p>{message}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container-bascontti">
    <div class="ilustration">
      <img src="/images/ilustration-01.svg" alt="ilustracion" />
    </div>
    <div class="titulo ">
      <h1 class="bold">Vista General</h1>
    </div>
    <div class="table">
      <div class="box">
        <div class="titles">
          <p class="text">
            &nbsp;&nbsp;Fecha
            {dateFormat(new Date().getTime())}&nbsp;&nbsp;
          </p>
        </div>
        <div class="grid">
          <div class="header ">
            {#if x > 621}
              <div class="header-item unique-item">
                <div class="titulo flex-centered bold">
                  <img src="/images/icon-person.svg" alt="icon-person" />
                  Asistencia del Dia
                </div>
              </div>

              <div class="header-item">
                <p class="flex-centered">Ingreso</p>
              </div>

              <div class="header-item">
                <p class="flex-centered">Salida</p>
              </div>
              <div class="header-item">
                <p class="flex-centered">Refrigerio</p>
              </div>
              <div class="header-item">
                <p class="flex-centered">Comentario</p>
              </div>
            {:else}
              <div class="header-item unique-item">
                <div class="titulo flex-centered bold">
                  <img src="/images/icon-person.svg" alt="icon-person" />
                  Asist.
                </div>
              </div>

              <div class="header-item">
                <p class="flex-centered">I.</p>
              </div>

              <div class="header-item">
                <p class="flex-centered">S.</p>
              </div>
              <div class="header-item">
                <p class="flex-centered">R.</p>
              </div>
              <div class="header-item">
                <p class="flex-centered">C.</p>
              </div>
            {/if}
          </div>
          <div class="body-grid">
            <div class="grid-body">
              {#if x > 1141}
                <div class="body-item unique-item ">
                  {#each $generalData as trabajador}
                    <p>{trabajador.nombre + " " + trabajador.apellido}</p>
                  {/each}
                </div>
              {:else}
                <div class="body-item unique-item ">
                  {#each $generalData as trabajador}
                    <p>{trabajador.apodo}</p>
                  {/each}
                </div>
              {/if}

              <div class="body-item body-mark-blue">
                {#each $generalData as trabajador}
                  <p>
                    {getHoursAndMinutos(trabajador.ingreso.fecha)}
                  </p>
                {/each}
              </div>
              <div class="body-item body-mark-green">
                {#each $generalData as trabajador}
                  <p>
                    {getHoursAndMinutos(trabajador.salida.fecha)}
                  </p>
                {/each}
              </div>
              <div class="body-item body-mark-green">
                <p>-</p>
                <p>-</p>
                <p>-</p>
                <p>01:00</p>
                <p>01:00</p>
                <p>01:00</p>
              </div>
              <div class="body-item">
                {#each $generalData as trabajador}
                  {#if trabajador.ingreso !== false && trabajador.ingreso.comentario !== ""}
                    <p
                      class="cursor-change"
                      on:click={() => {
                        message = trabajador.ingreso.comentario;
                        showModal = true;
                      }}
                    >
                      <img src="/images/comment-icon.svg" alt="comment icon" />
                    </p>
                  {:else}
                    <p>-</p>
                  {/if}
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .ilustration {
    position: absolute;
    bottom: 34px;
    right: 72px;
    z-index: -1;
  }

  .titulo {
    margin-bottom: 50px;
  }

  @media only screen and (max-width: 1531px) {
    .ilustration {
      display: none;
    }
    .box {
      max-width: 100% !important;
    }
  }
  .box {
    max-width: 65%;
    border-radius: 30px !important;
    box-shadow: none;
    height: auto;
    .grid {
      height: 90%;
      margin-left: 22px;
      margin-right: 22px;
      margin-top: 22px;
      margin-bottom: 22px;
      .header {
        display: grid;
        grid-template-columns: 1fr 0.6fr 0.6fr 0.6fr 0.6fr;

        place-items: center;
        margin-top: 16px;
        margin-bottom: 24px;
        .header-item {
          .flex-centered {
            display: flex;
            align-items: center;
            margin: 0;
          }
        }
        .unique-item {
          justify-self: left !important;
        }
      }
    }
    .grid-body {
      display: grid;
      grid-template-columns: 1fr 0.6fr 0.6fr 0.6fr 0.6fr;

      .body-item {
        display: grid;
        grid-template-rows: repeat(auto-fill, minmax(20px, 1fr));
        row-gap: 20px;
        position: relative;
        z-index: 2;
        width: 100%;
        place-items: center;
        padding-top: 10px;
        padding-bottom: 10px;
        p {
          display: flex;
        }
      }
      .body-mark-blue:before {
        background-color: #baccfd;
        width: 70%;
        height: 100%;
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 15px;
      }
      .body-mark-green:before {
        background-color: #f2f3cb;
        width: 70%;
        height: 100%;
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 15px;
      }
      .unique-item {
        justify-items: left !important;
        border-right: 1px solid #dedede;
      }
    }
    .titles {
      display: flex;

      p {
        background-color: #f2f3cb;
        border-radius: 5px;
      }
    }

    z-index: 2;
  }
  .table {
    background-color: inherit;
  }
  @media only screen and (max-width: 1080px) {
    .container-bascontti {
      margin-top: 0px;
      margin-left: 24px;
      margin-right: 24px;
      padding-top: 24px;
      height: 100%;
    }
    .flex-centered {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
    .table {
      margin-top: 24px;
      display: flex;
      justify-content: center;

      .box {
        width: 100%;
      }
    }
    .titulo {
      display: flex;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 621px) {
    .body-item {
      font-size: 10px;
      grid-template-rows: repeat(auto-fill, minmax(16px, 1fr)) !important;
    }
    .grid {
      margin: 0px !important;
    }
  }
  .mybox {
    margin-left: 24px;
    margin-right: 24px;
    background-color: white;
    border-radius: 30px;
    min-height: 200px;
    min-width: 300px;

    .titulo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      .titulito {
        margin-top: 1rem;
        margin-bottom: 0px !important;
      }
    }
    .mensaje {
      margin: 2rem;
      border-radius: 30px;
    }
    .icon-close {
      cursor: pointer;
      position: absolute;
      margin-top: 21px;
      margin-right: 42px;
      right: 0;
      height: 100%;
      float: right;
    }
  }
</style>
