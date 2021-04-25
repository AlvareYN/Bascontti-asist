<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { db, storage } from "../../../firebase";
  import { generalData } from "../../../stores";
  import { v4 as uuid4 } from "uuid";
  import Loader from "./Loader.svelte";
  import { goto } from "@roxi/routify/runtime/helpers";
  export let id_user = false;
  export let type = "add";

  const inputs = writable({
    file: null,
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    dni: "",
    contacto: "",
    puesto: "",
    sueldo: "",
    asignacion_familiar: false,
  });
  let isLoading = true;
  let isFileHidden = true;
  let srcHidden;
  let file;
  let title;
  let isDisabled = false;
  //terminar el envio-edicion de usuario
  const send = async () => {
    let reference;
    try {
      if ($inputs.file === null) {
        reference = false;
      } else {
        let response = await storage
          .ref("user-images")
          .child(uuid4())
          .put($inputs.file[0]);
        reference = response.metadata.fullPath;
      }
      let docObj = {
        image_path: reference,
        nombre: $inputs.nombre,
        apellido: $inputs.apellido,
        fechaNacimiento: $inputs.fechaNacimiento,
        dni: $inputs.dni,
        contacto: $inputs.contacto,
        puesto: $inputs.puesto,
        sueldo: $inputs.sueldo,
        asignacion_familiar: $inputs.asignacion_familiar,
      };
      let docRef = await db.collection("Trabajadores").add(docObj);
      generalData.update((generaldata) => {
        generaldata.push({
          ...docObj,
          id: docRef.id,
          ingreso: false,
          salida: false,
        });
        return generaldata;
      });
    } catch (error) {
      console.log(error);
    } finally {
      alert("usuario agregado correctamente");
      $inputs = {
        file: null,
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        dni: "",
        contacto: "",
        puesto: "",
        sueldo: "",
        asignacion_familiar: false,
      };
    }
  };
  const openFileDialog = () => {
    let fileInput = document.getElementById("file");
    fileInput.click();
  };
  const edit = async () => {
    let reference;
    try {
      if ($inputs.file === null) {
        reference = false;
      } else {
        let response = await storage
          .ref("user-images")
          .child(uuid4())
          .put($inputs.file[0]);
        reference = response.metadata.fullPath;
      }
      let docObj = {
        image_path: reference,
        nombre: $inputs.nombre,
        apellido: $inputs.apellido,
        fechaNacimiento: $inputs.fechaNacimiento,
        dni: $inputs.dni,
        contacto: $inputs.contacto,
        puesto: $inputs.puesto,
        sueldo: $inputs.sueldo,
        asignacion_familiar: $inputs.asignacion_familiar,
      };
      await db.collection("Trabajadores").doc(id_user).update(docObj);
      generalData.update((generaldata) => {
        let index = generaldata.findIndex((user) => user.id === id_user);
        if (docObj.reference !== false) {
          generaldata[index].image_path = docObj.image_path;
        }

        generaldata[index].nombre = $inputs.nombre;
        generaldata[index].apellido = $inputs.apellido;
        generaldata[index].fechaNacimiento = $inputs.fechaNacimiento;
        generaldata[index].dni = $inputs.dni;
        generaldata[index].contacto = $inputs.contacto;
        generaldata[index].puesto = $inputs.puesto;
        generaldata[index].sueldo = $inputs.sueldo;
        generaldata[index].asignacion_familiar = $inputs.asignacion_familiar;
        return generaldata;
      });
      alert("Usuario editado con exito");
      $goto("/registros/app/usuarios");
    } catch (error) {
      console.log(error);
    }
  };

  $: file = $inputs.file;
  $: if (file) {
    if (
      file[0].type === "image/png" ||
      file[0].type === "image/jpg" ||
      file[0].type === "image/jpeg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function (e) {
        srcHidden = e.target.result;
        isFileHidden = false;
      };
    }
  }
  $: console.log($generalData);
  onMount(async () => {
    if (type === "add") {
      title = "Agregar nuevo Usuario";
    } else if (type === "edit") {
      title = "Editar Usuario";
      let user = $generalData.find((user) => user.id === id_user);
      $inputs.nombre = user.nombre;
      $inputs.sueldo = user.sueldo;
      $inputs.asignacion_familiar = user.asignacion_familiar;
      $inputs.contacto = user.contacto;
      $inputs.dni = user.dni;
      $inputs.apellido = user.apellido;
      $inputs.puesto = user.puesto;
      $inputs.fechaNacimiento = user.fechaNacimiento;
      if (user.image_path !== false) {
        srcHidden = await storage.ref(user.image_path).getDownloadURL();
        isFileHidden = false;
      } else {
        isFileHidden = true;
      }
    } else if (type === "view") {
      title = "Informacion del usuario";
      let user = $generalData.find((user) => user.id === id_user);
      $inputs.nombre = user.nombre;
      $inputs.sueldo = user.sueldo;
      $inputs.asignacion_familiar = user.asignacion_familiar;
      $inputs.contacto = user.contacto;
      $inputs.dni = user.dni;
      $inputs.apellido = user.apellido;
      $inputs.puesto = user.puesto;
      $inputs.fechaNacimiento = user.fechaNacimiento;

      if (user.image_path !== false) {
        isFileHidden = false;
        srcHidden = await storage.ref(user.image_path).getDownloadURL();
      } else {
        isFileHidden = true;
      }
      isDisabled = true;
    }
    isLoading = false;
  });
</script>

<div class="container-bascontti">
  <div class="titulo ">
    <h1 class="bold">{title}</h1>
  </div>
  <div class="box grid">
    {#if isLoading}
      <Loader />
    {:else}
      <form
        class="form-container"
        on:submit|preventDefault={() => {
          if (type === "add") {
            send();
          } else if (type === "edit") {
            edit();
          }
        }}
      >
        <div class="header">
          <figure class="image is-128x128">
            <div
              class="mask"
              on:mouseenter={() => {
                if (srcHidden !== undefined && type !== "view") {
                  if (isFileHidden == false) {
                    isFileHidden = true;
                  }
                }
              }}
              on:mouseleave={() => {
                if (srcHidden !== undefined && type !== "view") {
                  if (isFileHidden) {
                    isFileHidden = false;
                  }
                }
              }}
            >
              <input
                id="file"
                type="file"
                style="display:none;"
                accept=".jpg,.png,.jpeg"
                bind:files={$inputs.file}
              />
              <img
                class="icon"
                src="/images/mask-image.svg"
                alt="mask"
                class:hidden={!isFileHidden}
                on:click={openFileDialog}
              />
              <img
                src={srcHidden}
                alt="prevImg"
                class="mask2"
                class:hidden={isFileHidden === true}
              />
            </div>
            <img
              class="is-rounded"
              src="/images/benito-user.jpg"
              alt="user"
              class:hidden={!isFileHidden}
            />
          </figure>
          <h1 class="texto-menu">Perfil</h1>
          {#if !isDisabled}
            <p class="no-active">
              <span style="color:var(--red-alert);">*</span>
              la imagen subida debe ser entre 500px de ancho y 500px de largo
            </p>
          {/if}
        </div>
        <div class="form">
          <div class="control">
            <label class="label" for="nombre">Nombre</label>
            <input
              disabled={isDisabled}
              class="input  is-rounded "
              type="text"
              placeholder="Nombre"
              bind:value={$inputs.nombre}
              required="true"
              minlength="5"
              maxlength="25"
            />
          </div>
          <div class="control">
            <label class="label" for="apellido">Apellido</label>
            <input
              bind:value={$inputs.apellido}
              disabled={isDisabled}
              minlength="5"
              maxlength="25"
              required="true"
              class="input  is-rounded"
              type="text"
              placeholder="Apellido"
            />
          </div>
          <div class="control">
            <label class="label" for="fecha de nacimiento">
              Fecha de Nacimiento
            </label>

            <input
              bind:value={$inputs.fechaNacimiento}
              disabled={isDisabled}
              class="input  is-rounded"
              type="date"
              placeholder="13/10/1996"
              required="true"
            />
          </div>
          <div class="control">
            <label class="label" for="dni">DNI</label>

            <input
              bind:value={$inputs.dni}
              disabled={isDisabled}
              maxlength="8"
              minlength="8"
              required="true"
              class="input  is-rounded"
              type="number"
              placeholder="77998804"
            />
          </div>
          <div class="control">
            <label class="label" for="Contacto">Contacto</label>
            <input
              bind:value={$inputs.contacto}
              disabled={isDisabled}
              minlength="9"
              maxlength="9"
              required="true"
              class="input  is-rounded"
              type="text"
              placeholder="913344900"
            />
          </div>
          <div class="control">
            <label class="label" for="puesto">Puesto</label>
            <div class="select is-info is-rounded ">
              <select
                class="input"
                bind:value={$inputs.puesto}
                disabled={isDisabled}
              >
                <option disabled selected value={""}
                  >Seleccione el puesto</option
                >
                <option value={"produccion"}>Producción</option>
                <option value={"jefe_produccion"}>Jefe Producción</option>
                <option value={"administrativo"}>Administrativo</option>
                <option value={"asis_administrativo"}
                  >Asistente Administrativo</option
                >
              </select>
            </div>
          </div>
          <div class="control">
            <label class="label" for="sueldo">Sueldo</label>

            <input
              disabled={isDisabled}
              required="true"
              class="input  is-rounded"
              type="number"
              placeholder="1100"
              bind:value={$inputs.sueldo}
            />
          </div>
          <div class="control">
            <label class="label" for="radio">Asignacion Familiar</label>
            <div class="centering">
              <label class="checkbox" for="yes"> Si </label>
              <input
                type="checkbox"
                bind:checked={$inputs.asignacionFamiliar}
                disabled={isDisabled}
              />
            </div>
          </div>
        </div>
        <div class="buttons">
          {#if type === "add"}
            <button class="boton-bascontti" type="submit">
              <img src="/images/plus-user.svg" alt="plus" />&nbsp; Crear Usuario
            </button>
          {:else if type === "edit"}
            <button class="boton-bascontti" type="submit">
              <img src="/images/plus-user.svg" alt="plus" />&nbsp; Guardar
              Edición
            </button>
          {:else if type === "view"}
          <!--aqui no va nada mientras-->
          {/if}
        </div>
      </form>
    {/if}
  </div>
</div>

<style lang="scss">
  .buttons {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;

    height: 47px;
    display: flex;
    justify-content: center;
    .boton-bascontti {
      display: flex;
      align-items: center;
      padding-right: 16px;
      img {
        height: 16px;
        width: 16px;
      }
      background-color: var(--bascontti-color);
      color: white;
    }
  }
  .select:not(.is-multiple) {
    height: 52px;
    width: 100%;
  }
  .control {
    .input {
      height: 52px;
    }
    .centering {
      height: 52px;
      display: flex;
      align-items: center;
      .checkbox {
        margin-right: 0.5rem;
      }
      input[type="checkbox"] {
        margin-right: 0.5rem;
        height: 24px;
        width: 24px;
      }
    }
  }
  .no-active {
    color: var(--no-active-text) !important;
  }
  .form-container {
    width: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
  }
  .box {
    margin-top: 1rem;
    border-radius: 30px;

    .header {
      text-align: center;
      .image {
        margin-left: auto;
        margin-right: auto;
      }
    }
    .form {
      display: grid;
      grid-template-columns: minmax(200px, 1fr) minmax(200px, 1fr);
      grid-template-rows: auto;
      gap: 1rem 2rem;
    }
  }
  .header {
    figure {
      margin-top: 0.5rem;
    }
    h1 {
      margin-top: 0.5rem;
    }
    p {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
  .image {
    position: relative;
    z-index: 0;
    .mask2 {
      z-index: 2;
      position: absolute;

      border-radius: 100%;
      display: flex;
    }
    .hidden {
      display: none;
    }

    .mask {
      z-index: 1;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: rgba($color: #1d1d1d, $alpha: 0.7);
      border-radius: 100%;

      .icon {
        cursor: pointer;
        z-index: 2;
        height: 35px;
        width: 35px;
      }
    }
  }
  @media only screen and (max-width: 1610px) {
    .form-container {
      width: 100%;
    }
  }
  @media only screen and (max-width: 700px) {
    .container-bascontti {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    .form-container {
      .form {
        grid-template-columns: minmax(200px, 1fr);
        grid-template-rows: auto;
      }
    }
  }
</style>
