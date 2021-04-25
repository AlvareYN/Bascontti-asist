<script>
  /**
   * incompleto, falta primero tener un metodo
   *  para guardar los pagos antes de continuar
   *  con este componente
   */
  import { onMount } from "svelte";
  export let scoped;
  let workerId;
  $: workerId = scoped.workerId;
  let currentPage = 1;
  let dataPerPage = 7;
  let end;
  let table;
  const nextPage = () => {
    if (currentPage < numPages()) {
      currentPage++;
      changePage(currentPage, "next");
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      changePage(currentPage, "prev");
    }
  };

  const changePage = (current, action) => {
    /*let start = (currentPage - 1) * dataPerPage;
    end = start + dataPerPage;

    for (let i = 0; i < $ingreso_salida.length; i++) {
      if (i >= start && i < end) {
        table.childNodes[i].classList.remove("not-visible");
      } else {
        table.childNodes[i].classList.add("not-visible");
      }
    }*/
  };

  const numPages = () => {
    /*return Math.ceil($ingreso_salida.length / dataPerPage);*/
  };

  onMount(() => {
    /*end = 7;
    table = document.getElementById("table");
    for (let i = 0; i < dataPerPage; i++) {
      table.childNodes[i].classList.remove("not-visible");
    }*/
  });
</script>

<div class="box">
  <div class="tab-container">
    <div class="table-bascontti">
      <div class="table-head">
        <div class="row">
          <div class="item">ID</div>
          <div class="item">Fecha</div>
          <div class="item">Monto</div>
          <div class="item">Fechas <br />Pagadas</div>
          <div class="item">Descripción</div>
          <div class="item">Acción</div>
          <div class="item">Realizado por</div>
        </div>
      </div>
      <div class="table-body" id="table">
        <div class="row ">
          <div class="item">#001</div>

          <div class="item">20/01/2020</div>

          <div class="item">S/ 2000</div>

          <div class="item">19/12/2020 al <br /> 31/12/2020</div>

          <div class="item">
            <div class="tag green">sueldo</div>
            <div class="tag blue">asd</div>
          </div>

          <div class="item">...</div>
          <div class="item">Silvana alvarado</div>
        </div>
        <div class="row ">
          <div class="item">#001</div>

          <div class="item">20/01/2020</div>

          <div class="item">S/ 2000</div>

          <div class="item">19/12/2020 al <br /> 31/12/2020</div>

          <div class="item">
            <div class="tag green">sueldo</div>
            <div class="tag blue">asd</div>
          </div>

          <div class="item">...</div>
          <div class="item">Silvana alvarado</div>
        </div>
        <div class="row ">
          <div class="item">#001</div>

          <div class="item">20/01/2020</div>

          <div class="item">S/ 2000</div>

          <div class="item">19/12/2020 al <br /> 31/12/2020</div>

          <div class="item">
            <div class="tag green">sueldo</div>
            <div class="tag blue">asd</div>
          </div>

          <div class="item">...</div>
          <div class="item">Silvana alvarado</div>
        </div>
        <div class="row ">
          <div class="item">#001</div>

          <div class="item">20/01/2020</div>

          <div class="item">S/ 2000</div>

          <div class="item">19/12/2020 al <br /> 31/12/2020</div>

          <div class="item">
            <div class="tag green">sueldo</div>
            <div class="tag blue">asd</div>
          </div>

          <div class="item">...</div>
          <div class="item">Silvana alvarado</div>
        </div>
        <div class="row ">
          <div class="item">#001</div>

          <div class="item">20/01/2020</div>

          <div class="item">S/ 2000</div>

          <div class="item">19/12/2020 al <br /> 31/12/2020</div>

          <div class="item">
            <div class="tag green">sueldo</div>
            <div class="tag blue">asd</div>
          </div>

          <div class="item">...</div>
          <div class="item">Silvana alvarado</div>
        </div>
        <div class="row ">
          <div class="item">#001</div>

          <div class="item">20/01/2020</div>

          <div class="item">S/ 2000</div>

          <div class="item">19/12/2020 al <br /> 31/12/2020</div>

          <div class="item">
            <div class="tag green">sueldo</div>
            <div class="tag blue">asd</div>
          </div>

          <div class="item">...</div>
          <div class="item">Silvana alvarado</div>
        </div>
        <div class="row ">
          <div class="item">#001</div>

          <div class="item">20/01/2020</div>

          <div class="item">S/ 2000</div>

          <div class="item">19/12/2020 al <br /> 31/12/2020</div>

          <div class="item">
            <div class="tag green">sueldo</div>
            <div class="tag blue">asd</div>
          </div>

          <div class="item">...</div>
          <div class="item">Silvana alvarado</div>
        </div>
      </div>
      <div class="table-footer">
        <div class="pagination">
          <div class="text">pagina {currentPage} de {numPages()}</div>
          <div class="prev" on:click={prevPage}>
            <img src="/images/prev-img.svg" alt="previous img" />
          </div>
          <div class="next" on:click={nextPage}>
            <img src="/images/next-img.svg" alt="next img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .box {
    padding: 1rem;
  }
  .tab-container {
    width: 100%;
  }
  .box {
    border-radius: 30px;
    box-shadow: none;
  }
  .table-bascontti {
    display: grid;

    grid-template-rows: 0fr 1fr;
    .table-head {
      .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        place-items: center;
        .item {
          display: flex;
          text-align: center;

          font-family: infraSemiBold;
          color: var(--no-active-textt);
          font-size: 16px;
        }
      }
    }
    .table-body {
      /*.row.not-visible {
        display: none;
      }*/
      .row {
        border: 1px solid var(--blue-light);
        border-radius: 100px;
        min-height: 40px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        margin: 8px 0;
        place-items: center;
        .item {
          font-size: 15px;
          font-family: infraRegular;
          color: var(--no-active-text);
          .tag {
            font-size: 16px;
            height: 30px;
            border-radius: 215px;
            color: white;
          }
          .tag.blue {
            background-color: var(--blue-bright);
          }
          .tag.green {
            background-color: var(--bascontti-color);
          } /*
          .tag.blue-dark {
            background-color: var(--black-text);
          }*/
          img {
            cursor: pointer;
          }
        }
      }
    }
    .table-footer {
      margin-top: 12px;
      display: grid;
      grid-template-columns: 1fr;
      margin-right: 22px;
      margin-left: 22px;

      .pagination {
        display: flex;
        justify-content: flex-end;
        .prev {
          margin-right: 22.5px;
        }
        .next {
          margin-left: 22.5px;
        }
        .text {
          margin-right: 18px;
          color: var(--no-active-text);
        }
      }
    }
  }
</style>
