<script>
  import { ingreso_salida } from "../../../../stores";
import { getMoneyByMinutes } from "../../../../utils";
  import TableCalculo from "../../../_components/TableCalculo.svelte";
  import Loader from "../../../_components/utils/Loader.svelte";
  export let scoped;
  let totalObj;
  let worker;
  $: worker = scoped.worker;
  $: totalObj = scoped.totalObj;
  
</script>

{#if $ingreso_salida === false}
  <div class="box">
    <Loader />
  </div>
{:else if $ingreso_salida.length === 0}
  <div class="box">
    <div>
      <h1 class="titulo">Seleccione la fecha a calcular en el calendario</h1>
      <img src="/images/no-table-data.svg" alt="no table data" />
    </div>
  </div>
{:else}
  <TableCalculo workerId={scoped.workerId} />
{/if}
<div class="footer-grid">
  <div class="item yellow-gradient">
    <div class="texto">
      <h1 class="bold">Ingreso</h1>
    </div>
    <div class="inner-box">
      <img src="/images/money.svg" alt="money" />
      <div class="totals">
        <div class="left">
          <div class="row">Sueldo</div>
          <div class="row">Asig f.</div>
          <div class="row">Bono</div>
          <div class="row">CTS</div>
        </div>
        <div class="right">
          <div class="row">
            S/
            {totalObj.total === "-"
              ? "-"
              : getMoneyByMinutes(totalObj.total, worker)}
          </div>
          <div class="row">S/ -</div>
          <div class="row">S/ -</div>
          <div class="row">S/ -</div>
        </div>
      </div>
    </div>
  </div>
  <div class="item blue-gradient">
    <div class="texto">
      <h1 class="bold">Descuentos</h1>
    </div>
    <div class="inner-box">
      <img src="/images/chanchito.svg" alt="chanchito" />
      <div class="totals">
        <div class="left">
          <div class="row">AFP</div>
          <div class="row">ONP</div>
        </div>
        <div class="right">
          <div class="row">S/ {totalObj.afp}</div>
          <div class="row">S/ {totalObj.onp}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="item green-gradient">
    <div class="texto">
      <h1 class="bold">Total <br />a Pagar</h1>
    </div>
    <div class="inner-box">
      <img src="/images/card-money.svg" alt="card-money" />
      <div class="totals">
        <div class="left">
          <div class="row">Sueldo a Pagar</div>
        </div>
        <div class="right">
          <div class="row">S/ -</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .box {
    min-height: 460px;
    border-radius: 30px;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      text-align: center;
      .titulo {
        margin-bottom: 1rem;
        font-family: infraSemiBold;
        color: var(--no-active-text);
      }
    }
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;

    .yellow-gradient {
      justify-self: left;
      background: linear-gradient(
        101.84deg,
        #afb252 18.11%,
        #dfe435 95.75%,
        #d2d663 98.94%
      );
    }
    .blue-gradient {
      justify-self: center;
      background: linear-gradient(
        101.84deg,
        #353e6c 17.1%,
        #5e81f4 98.94%,
        #5e81f4 98.95%
      );
    }
    .green-gradient {
      justify-self: right;
      background: linear-gradient(101.84deg, #f2f3cb 30.63%, #ecef93 98.95%);
    }
    .item {
      border-radius: 30px;
      background-color: white;
      height: 280px;
      width: 300px;
      bottom: 2px;
      position: relative;
      z-index: 0;

      .texto {
        height: 100%;
        margin: 32px;
        font-size: 1.5rem;
        h1 {
          color: white;
          line-height: 24px;
          z-index: 1;
        }
      }
      .inner-box {
        position: absolute;
        bottom: -2px;
        height: 65%;
        width: 100%;
        border-radius: 30px;
        background-color: white;

        img {
          position: inherit;
          right: 32px;
          top: -60px;
          z-index: 0;
        }
        .totals {
          font-weight: 400;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin: 32px;
          color: var(--black-text);
          place-items: center;
          .left {
            justify-self: left;
            text-align: left;
          }
          .right {
            justify-self: right;
            text-align: right;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1611px) {
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      .item {
        width: 100%;
      }
      gap: 16px;
    }
  }
  @media only screen and (max-width: 920px) {
    .footer-grid {
      display: grid;
      grid-template-columns: unset;
      grid-template-rows: 1fr 1fr 1fr;
      place-items: center;
      width: 100%;
      gap: 44px;
      .item {
        border-radius: 30px;
        background-color: white;
        width: 100%;
        height: 210px;
      }
    }
  }
</style>
