<script>
  import { isActive, url } from "@roxi/routify";
  import { generalData, ingreso_salida, pagos } from "../../../../stores";
  import Calendar from "../../../_components/Calendar.svelte";
  import Select from "../../../_components/utils/Select.svelte";
  import { getPagos, getRangeAttendance } from "../../../../firebaseUtils";
  import { calcularSalario, joinOnlyWorkerData } from "../../../../utils";

  let isHidden = true;
  let select = 0;
  let selectName = "";
  $: selectName = $generalData[select].nombre;
  let workerId;
  let totalObj;
  let start;
  let end;
  let days;
  let worker;
  $: worker = $generalData[select];
  $: workerId = $generalData[select].id;
  $: totalObj = calcularSalario($ingreso_salida);
  const onSelectChange = (event) => {
    let obj = event.detail;
    select = obj.index;
    ingreso_salida.set([]);
    pagos.set([])
    start = undefined;
    end = undefined;
  };
  const onConsultar = async (event) => {
    ingreso_salida.set(false);
    start = event.detail.start.getTime();
    end = event.detail.end.getTime();
    days = event.detail.days;
    let tempData = await getRangeAttendance(workerId, start, end);
    ingreso_salida.set(joinOnlyWorkerData(tempData, days, start, end));
    let pagosData = await getPagos(start, end, workerId);
    pagos.set(pagosData);
  };
  $: console.log(workerId);
  $: console.log($pagos);
</script>

<div class="grid">
  <div
    class="icon-sidebar"
    on:click={() => {
      isHidden = !isHidden;
    }}
  >
    <img
      src={isHidden === false
        ? "/images/menu-close.svg"
        : "/images/calendar-icon.svg"}
      alt=""
    />
  </div>

  <div class="container-bascontti">
    <div class="titulo-container">
      <h1 class="titulo titulito bold">Planilla del Personal</h1>
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
            <li class="calc" class:active={$isActive("./index")}>
              <a href={$url("./")}> Cálculo </a>
            </li>
            <li class="pay" class:active={$isActive("./pagos")}>
              <a href={$url("./pagos")}> Pagos </a>
            </li>
          </ul>
        </div>
      </div>
      <slot scoped={{ workerId, totalObj, days, start, end, worker }} />
    </div>
  </div>
  <div
    class="calendar-bar"
    class:show={isHidden === false}
    class:hide={isHidden === true}
  >
    <Calendar on:onConsultar={onConsultar} />
    <div class="ilustracion">
      <img src="/images/ilustation-02.svg" alt="ilustracion 2" />
    </div>
  </div>
</div>

<style lang="scss">
  .icon-sidebar {
    display: none;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 0.3fr;
    height: 100%;
  }
  .container-bascontti {
    min-width: 250px;
    margin-left: 40px !important;
    margin-right: 40px !important;
    z-index: 100;
  }
  .calendar-bar {
    min-width: 375px;
    width: 100%;
    justify-self: right;
    background-color: white;
    height: 100%;
    position: relative;
    .ilustracion {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .titulo-container {
    margin-left: 16px !important;
    display: flex;
  }
  @media only screen and (min-width: 1472px) {
    .nav-planillas {
      ul {
        li {
          font-size: 16px;
        }
      }
    }
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
    .calendar-bar {
      width: 375px !important;
      position: fixed !important;
      top: 0;
      right: 0;
      background-color: white;
    }

    .icon-sidebar {
      cursor: pointer;
      display: flex;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
      margin-left: 24px;
      margin-top: 24px;
      justify-content: center;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .show {
      display: "";
      animation: fade-in 500ms;
    }
    .hide {
      display: none;
    }
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .icon-sidebar {
      display: flex;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
      margin-right: 16px;
      margin-top: 24px;
      justify-content: center;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }

  .ilustracion {
    margin: 40px;
    z-index: 0;
  }

  .content-container {
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
          .pay {
            margin-left: 32px;
            justify-self: left;
          }
          li {
            a {
              color: #8da1b5;
            }

            position: relative;
          }
          li.active {
            a {
              color: #5e81f4;
            }
          }
          li.active::before {
            content: "";
            position: absolute;
            left: 35%;
            right: 35%;
            bottom: -12px;
            height: 3px;
            width: 30%;

            border-bottom: 3px solid #5e81f4;
            border-radius: 12px;
          }
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
