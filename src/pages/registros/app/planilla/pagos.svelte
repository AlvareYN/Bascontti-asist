<script>
  import { dateFormatOnlyDate, getMoneyByMinutes } from "../../../../utils";
  import { pagos } from "../../../../stores";
  export let scoped;
  let worker;
  const getTotalPagado = () => {
    let total = 0;
    for (const pago of $pagos) {
      total += pago.pago;
    }
    return total;
  };
  $: worker = scoped.worker;
  $: totalObj = scoped.totalObj;
  $: days = scoped.days;
  $: start = scoped.start;
  $: end = scoped.end;
  $: pagado = $pagos.length > 0 ? getTotalPagado() : 0;
  $: adeudado = getMoneyByMinutes(totalObj.total, worker) - pagado;
  $: console.log(pagado);
</script>

<div class="box">
  <div class="header">
    <p class="texto-menu resumen">Resumen</p>
    <p class="bold">Depositar</p>
  </div>
  <div class="content">
    <div class="left">
      <div class="item date">
        <h1 class="texto-menu">Fecha Seleccionadas</h1>
        {#if start !== undefined && end !== undefined}
          <p class="light-text">
            {dateFormatOnlyDate(start)} al {dateFormatOnlyDate(end)}
          </p>
        {:else}
          <p class="light-text">Seleccione un rango de fecha por favor</p>
        {/if}
      </div>
      <div class="item">
        <h1 class="texto-menu">Detalles</h1>
        <div class="text">
          <div class="light-text">Sueldo neto</div>
          <div class="value light-text">
            <span>S/</span>{totalObj.total === "-"
              ? 0
              : getMoneyByMinutes(totalObj.total, worker)}
          </div>
        </div>
        <div class="text">
          <div class="light-text">Sueldo pagado</div>
          <div class="value"><span>S/</span>{pagado}</div>
        </div>
        <div class="text">
          <div class="red-text">Sueldo adeudado</div>
          <div class="value red-text">
            <span>S/</span>{isNaN(adeudado) ? 0 : adeudado}
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon-up">
          <img src="/images/up.svg" alt="up" />
        </div>
        <div class="boxy">
          <div class="text">
            <div class="red-text">Sueldo bruto</div>
            <div class="value ">
              <div class="value red-text">
                <span>S/</span>{isNaN(adeudado) ? 0 : adeudado}
              </div>
            </div>
          </div>
          <div class="text">
            <div class="light-text">Asig. familiar</div>
            <div class="value"><span>S/</span>{totalObj.asignacionFam}</div>
          </div>
          <div class="text">
            <div class="light-text">Bono</div>
            <div class="value red-text"><span>S/</span>{totalObj.bono}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <h1 class="texto-menu">Monto a pagar</h1>
        <div class="inputs">
          <div class="light-text">Sueldo Neto</div>
          <input type="number" class="green" />
        </div>
        <div class="inputs">
          <div class="light-text">Asig f.</div>
          <input class="blue" type="number" />
        </div>
        <div class="inputs">
          <div class="light-text">Bono</div>
          <input type="number" class="blue" />
        </div>
      </div>
      <div class="item">
        <h1 class="texto-menu">Medio de pago</h1>
        <div class="inputs">
          <div class="light-text">Efectivo</div>
          <input type="number" />
        </div>
        <div class="inputs">
          <div class="light-text">Transferencia</div>
          <input type="number" />
        </div>
        <div class="buttons">
          <button class="blue">Pagar</button>
          <button class="red">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    button.red {
      background-color: var(--red-alert);
    }
    button.blue {
      background-color: var(--blue-bright);
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;

      font-family: infraLight !important;
      font-size: 24px;
      font-weight: 500;
      border-radius: 100px;
      border: 1px solid #baccfd;
      z-index: 0;
      cursor: pointer;
    }
    button:hover {
      border-width: 3px;
    }
  }
  .red-text {
    color: var(--red-alert);
    font-size: 18px;
  }
  .icon-up {
    display: flex;
    justify-content: center;
  }
  .boxy {
    background-color: var(--background);
    padding: 1rem;
    width: 100%;
    border-radius: 15px;
  }
  .box {
    border-radius: 30px;
    box-shadow: none;
    min-height: 460px;
    .header {
      font-size: 32px;
      .resumen {
        font-size: 16px;
        color: var(--blue-bright) !important;
      }
    }
    .content {
      padding-left: 60px;
      padding-right: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 100px;
      .left {
        justify-self: center;
        display: block;
        .date {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .item {
          color: var(--no-active-text) !important;
          font-family: infraLight;
          p {
            color: var(--no-active-text) !important;

            text-align: center;
          }
          .texto-menu {
            justify-self: left;
            font-size: 24px;
          }
          .text {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-self: left;

            margin-left: 1rem;
            .value {
              justify-self: center;
            }
          }
        }
      }
      .right {
        justify-self: center;
        .item {
          display: block;

          .texto-menu {
            font-size: 24px;
          }
          .inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            height: 32px;
            margin: 0.5rem 0;

            gap: 1rem;
            input {
              justify-self: center;
              padding: 1rem;
              width: 80%;
            }
            input:focus {
              border-width: 2px;
            }
            div {
              justify-self: left;
              margin-left: 3rem;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 920px) {
  }
  :global(input) {
    outline: none !important;
  }
</style>
