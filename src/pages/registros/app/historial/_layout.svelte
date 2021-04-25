<script>
  export let scoped;
  if (scoped) {
  }
  import { generalData, ingreso_salida } from "../../../../stores";
  import Select from "../../../_components/utils/Select.svelte";

  let isHidden = true;
  let select = 0;
  let selectName = "";
  $: selectName = $generalData[select].nombre;
  let workerId;
  let totalObj;
  $: workerId = $generalData[select].id;
  const onSelectChange = (event) => {
    let obj = event.detail;
    select = obj.index;
  };
</script>

<div class="grid">
  <div class="container-bascontti">
    <div class="titulo-container">
      <h1 class="titulo titulito bold">Historial de actividad</h1>
    </div>
    <div class="content-container">
      <div class="box user-info-grid">
        <div class="grid-dropdown">
          <Select
            on:changeSelect={onSelectChange}
            title={"Colaborador"}
            list={$generalData}
            selected={select}
          />

          <div class="name">
            <p class="titulo bold">{selectName}</p>
          </div>
          <div class="ilustration">
            <figure class="image is-74x74">
              <img class="is-rounded" src="/images/avatar.svg" alt="img-user" />
            </figure>
          </div>
        </div>
        <div class="nav-planillas">
          <ul>
            <li class="calc active">Historial de pagos</li>
          </ul>
        </div>
      </div>
      <slot scoped={{ workerId, totalObj }} />
    </div>
  </div>
</div>

<style lang="scss">
  .container-bascontti {
    min-width: 250px;
    margin-left: 40px !important;
    margin-right: 40px !important;
    z-index: 100;
  }

  .titulo-container {
    margin-left: 16px !important;
    display: flex;
  }
  @media only screen and (max-width: 1471px) {
    .grid {
      all: unset !important;
    }
    .container-bascontti {
      margin-top: 0px;
      margin-left: 24px;
      margin-right: 24px;
      padding-top: 24px;
      height: 100%;
    }
    .titulo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      .titulito {
        margin-bottom: 0px !important;
      }
    }
  }
  .nav-planillas {
    ul {
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      place-items: center;
      font-family: infraSemiBold;
      .calc {
        justify-self: right;
        margin-right: 32px;
      }

      li {
        color: #8da1b5;
        position: relative;
      }
      li.active {
        color: #5e81f4;
      }
      li.active::before {
        content: "";
        position: absolute;
        left: 40%;
        right: 40%;
        bottom: -12px;
        height: 3px;
        width: 20%;
        border-top: 2px solid #5e81f4;
        border-bottom: 2px solid #5e81f4;
        border-radius: 10px;
        
        
      }
    }
  }
  .content-container {
    margin-left: 3rem;
    margin-right: 3rem;
    .user-info-grid {
      padding-top: 8px;
      padding-right: 16px;
      padding-left: 16px;
      padding-bottom: 8px;

      margin-top: 16px;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      .grid-dropdown {
        display: grid;
        grid-template-areas:
          "dropdown ilustration"
          "name     ilustration";

        .name {
          grid-area: name;
        }
        .ilustration {
          grid-area: ilustration;
        }
      }
    }
    .box {
      border-radius: 30px;
      box-shadow: none;
    }
  }
  .image.is-74x74 {
    width: 74px;
    height: 74px;
  }
</style>
