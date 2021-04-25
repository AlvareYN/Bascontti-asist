<script>
  import { onMount } from "svelte";
  import {
    addAttendanceDashboard,
    delAttendenceDashboard,
    editAttendenceDashboard,
  } from "../../firebaseUtils";
  import { ingreso_salida } from "../../stores";
  import {
    dateFormatOnlyDate,
    fromStringToMinutes,
    lookForNewAttendance,
    minutesToString,
    updateStore,
  } from "../../utils";
  export let workerId;
  let showModal = false;
  let message = "";
  let currentPage = 1;
  let dataPerPage = 7;
  let end;
  let isEditable = false;
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
    let start = (currentPage - 1) * dataPerPage;
    end = start + dataPerPage;

    for (let i = 0; i < $ingreso_salida.length; i++) {
      if (i >= start && i < end) {
        table.childNodes[i].classList.remove("not-visible");
      } else {
        table.childNodes[i].classList.add("not-visible");
      }
    }
  };

  const numPages = () => {
    return Math.ceil($ingreso_salida.length / dataPerPage);
  };

  const saveChanges = () => {
    let objActions = lookForNewAttendance($ingreso_salida, workerId);
    if (
      objActions.insertArray.length > 0 ||
      objActions.delArray.length > 0 ||
      objActions.editArray.length > 0
    ) {
      if (objActions.insertArray.length > 0) {
        objActions.insertArray.forEach((element) => {
          addAttendanceDashboard(element);
        });
      }
      if (objActions.delArray.length > 0) {
        objActions.delArray.forEach((elem) => {
          delAttendenceDashboard(elem);
        });
      }
      if (objActions.editArray.length > 0) {
        objActions.editArray.forEach((elem) => {
          editAttendenceDashboard(elem);
        });
      }
      updateStore(ingreso_salida);
    } else {
      alert("no hay ningun cambio que guardar");
    }
  };
  
  onMount(() => {
    end = 7;
    table = document.getElementById("table");
    if (table.childNodes.length > 1) {
      for (let i = 0; i < dataPerPage; i++) {
        table.childNodes[i].classList.remove("not-visible");
      }
    } else if (table.childNodes.length === 1) {
      table.childNodes[0].classList.remove("not-visible");
    }
  });
</script>

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

<div class="box">
  <div class="tab-container">
    <div class="table-bascontti">
      <div class="table-head">
        <div class="row">
          <div class="item">Fecha</div>
          <div class="item">Ingreso</div>
          <div class="item">Salida</div>
          <div class="item">Almuerzo</div>
          <div class="item" />
          <div class="item unique-blue">Hora <br /> Ordinarias</div>
          <div class="item unique-red">Horas <br /> Extras</div>
          <div class="item">Horas <br /> Totales</div>
        </div>
      </div>
      <div class="table-body" id="table">
        {#each $ingreso_salida as daysRange, i}
          <div class="row not-visible">
            <div class="item">
              {dateFormatOnlyDate(daysRange.fecha)}
            </div>
            {#if isEditable}
              <input
                type="time"
                class="item"
                bind:value={daysRange.ingreso}
                on:change={() => {
                  $ingreso_salida[i].isEditedIngreso = true;
                }}
              />
              <input
                type="time"
                class="item"
                bind:value={daysRange.salida}
                on:change={() => {
                  $ingreso_salida[i].isEditedSalida = true;
                }}
              />
              <div class="item">
                <input type="checkbox" bind:checked={daysRange.almuerzo} />
                {daysRange.almuerzo === true ? "01:00" : "-"}
              </div>
            {:else}
              <div class="item">
                {daysRange.ingreso === null || daysRange.ingreso === ""
                  ? "-"
                  : daysRange.ingreso}
              </div>
              <div class="item">
                {daysRange.salida === null || daysRange.ingreso === ""
                  ? "-"
                  : daysRange.salida}
              </div>
              <div class="item">
                {daysRange.almuerzo === true ? "01:00" : "-"}
              </div>
            {/if}

            <div class="item">
              <img
                on:click={() => {
                  message = daysRange.comentario;
                  showModal = true;
                }}
                src="/images/table-comment.svg"
                alt="table-coment"
              />
            </div>
            <div class="item">
              {#if fromStringToMinutes(daysRange.salida) > 1140}
                {#if daysRange.almuerzo}
                  {daysRange.ingreso !== null &&
                  daysRange.salida !== null &&
                  daysRange.ingreso !== "" &&
                  daysRange.salida !== ""
                    ? minutesToString(
                        1140 - fromStringToMinutes(daysRange.ingreso) - 60
                      )
                    : "-"}
                {:else}
                  {daysRange.ingreso !== null &&
                  daysRange.salida !== null &&
                  daysRange.ingreso !== "" &&
                  daysRange.salida !== ""
                    ? minutesToString(
                        1140 - fromStringToMinutes(daysRange.ingreso)
                      )
                    : "-"}
                {/if}
              {:else if daysRange.almuerzo}
                {daysRange.ingreso !== null &&
                daysRange.salida !== null &&
                daysRange.ingreso !== "" &&
                daysRange.salida !== ""
                  ? minutesToString(
                      fromStringToMinutes(daysRange.salida) -
                        fromStringToMinutes(daysRange.ingreso) -
                        60
                    )
                  : "-"}
              {:else}
                {daysRange.ingreso !== null &&
                daysRange.salida !== null &&
                daysRange.ingreso !== "" &&
                daysRange.salida !== ""
                  ? minutesToString(
                      fromStringToMinutes(daysRange.salida) -
                        fromStringToMinutes(daysRange.ingreso)
                    )
                  : "-"}
              {/if}
            </div>

            <!--crear una funcion que se encarge de esto, de pasada que setee el store para que tenga total1-->
            <div class="item">
              {#if fromStringToMinutes(daysRange.salida) > 1140}
                {daysRange.ingreso !== null &&
                daysRange.salida !== null &&
                daysRange.ingreso !== "" &&
                daysRange.salida !== ""
                  ? minutesToString(
                      fromStringToMinutes(daysRange.salida) - 1140
                    )
                  : "-"}
              {:else}-{/if}
            </div>

            <div class="item">
              <!--crear una funcion que se encarge de esto, de pasada que setee el store para que tenga total1-->
              {#if daysRange.almuerzo === true}
                {daysRange.ingreso !== null &&
                daysRange.salida !== null &&
                daysRange.ingreso !== "" &&
                daysRange.salida !== ""
                  ? minutesToString(
                      fromStringToMinutes(daysRange.salida) -
                        fromStringToMinutes(daysRange.ingreso) -
                        60
                    )
                  : "-"}
              {:else}
                {daysRange.ingreso !== null &&
                daysRange.salida !== null &&
                daysRange.ingreso !== "" &&
                daysRange.salida !== ""
                  ? minutesToString(
                      fromStringToMinutes(daysRange.salida) -
                        fromStringToMinutes(daysRange.ingreso)
                    )
                  : "-"}
              {/if}
            </div>
          </div>
        {/each}
      </div>
      <div class="table-footer">
        <div class="buttons">
          {#if isEditable}
            <button
              class="button-edit light-text green"
              on:click={() => {
                isEditable = false;
                saveChanges();
              }}
              ><img
                src="/images/save-icon.svg"
                alt="editbutton"
              />&nbsp;Guardar</button
            >
            <button
              class="button-edit light-text red"
              on:click={() => (isEditable = false)}
              ><img
                src="/images/cancel-icon.svg"
                alt="editbutton"
              />&nbsp;Cancelar</button
            >
          {:else}
            <button
              class="button-edit light-text blue"
              on:click={() => (isEditable = true)}
              ><img
                src="/images/edit-button.svg"
                alt="editbutton"
              />&nbsp;Editar</button
            >
          {/if}
        </div>
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
          color: var(--blue-bright);
          font-size: 16px;
        }
        .unique-red {
          color: var(--red-alert);
        }
        .unique-blue {
          color: var(--black-text);
        }
      }
    }
    .table-body {
      .row.not-visible {
        display: none;
      }
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
          img {
            cursor: pointer;
          }
        }
      }
    }
    .table-footer {
      margin-top: 12px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-right: 22px;
      margin-left: 22px;
      .buttons {
        display: flex;
        justify-content: flex-start;
        .button-edit.red {
          color: white;
          background-color: var(--red-alert);
        }
        .button-edit.green {
          margin-right: 16px;
          color: white;
          background-color: var(--bascontti-color);
        }
        .button-edit.blue {
          color: white;
          background-color: var(--blue-bright);
        }
        .button-edit {
          font-size: 12px;
          cursor: pointer;
          height: 35px;
          width: 96px;
          border: none;
          border-radius: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:active {
            opacity: 0.7;
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: flex-end;
        .prev {
          margin-right: 22.5px;
          cursor: pointer;
        }
        .next {
          margin-left: 22.5px;
          cursor: pointer;
        }
        .text {
          margin-right: 18px;
          color: var(--no-active-text);
        }
      }
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
