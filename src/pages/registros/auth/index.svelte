<script>
  import { auth } from "../../../firebase";
  import { authUser } from "../../../stores";
  import FloweredConered from "../../_components/FloweredConered.svelte";
  let email;
  let password;

  const login = async () => {
    try {
      let user = await auth.signInWithEmailAndPassword(email, password);
      authUser.set(user);
    } catch (error) {
      console.error(error);
    }
  };
</script>

<div class="hero is-fullheight">
  <FloweredConered />
  <form on:submit|preventDefault={login} class="boxy">
    <div class="logo">
      <img src="/images/logo.svg" alt="logo" />
    </div>
    <div class="title has-text-centered"><p>Iniciar sesión</p></div>
    <div class="field">
      <div class="control">
        <label for="Email">Dirección de email </label>
        <input
          type="email"
          placeholder="ejemplo@gmail.com"
          class="input is-rounded"
          bind:value={email}
        />
      </div>
    </div>
    <div class="field">
      <div class="control ">
        <label for="Password"
          >Contraseña<span class="bold">¿Olvidaste tu contraseña?</span></label
        >
        <input
          type="password"
          placeholder="***********"
          class="input is-rounded"
          bind:value={password}
        />
      </div>
    </div>
    <button type="submit" class="button is-rounded ">Ingresar</button>
  </form>
</div>

<style lang="scss">
  @media only screen and (max-width: 700px) {
    .boxy {
      padding-left: 20px !important;
      padding-right: 20px !important;
      padding-top: 85px;
      padding-bottom: 85px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .hero {
    background-color: white;
    justify-content: center !important;
    align-items: center !important;
    z-index: 0;
  }
  .boxy {
    border-radius: 30px;
    border: 1px solid var(--blue-light);
    padding-left: 65px;
    padding-right: 65px;
    padding-top: 85px;
    padding-bottom: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  label {
    color: var(--black-text);

    span {
      float: right;
      color: var(--bascontti-color);
    }
  }

  .field {
    width: 100%;
  }
  input {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #baccfd;
  }
  .control {
    max-width: 364px;
  }
  .button {
    margin-top: 2rem;
    width: 200px;
    color: white;
    background-color: var(--bascontti-color);
  }
</style>
