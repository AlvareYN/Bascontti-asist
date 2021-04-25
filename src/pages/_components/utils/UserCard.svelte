<script>
  import { createEventDispatcher } from "svelte";
  export let user = false;
  export let editCard = false;
  const dispatch = createEventDispatcher();

  const edit = () => {
    dispatch("edit", user);
  };
  const view = () => {
    dispatch("view", user);
  };
  const remove = () => {
    dispatch("remove", user);
  };
  const addNewUser = () => {
    dispatch("addNewUser");
  };
</script>

{#if editCard === false}
  <div class="cartas">
    <div class="mask">
      <div class="middle-img">
        <img class="middle" src="/images/user-images/big-middle.svg" alt="" />
      </div>
      <img
        class="middle-left"
        src="/images/user-images/middle-left.svg"
        alt="ilustration card"
      />
      <img
        class="bottom-left"
        src="/images/user-images/bottom-left.svg"
        alt="ilustration card2"
      />
      <img
        class="bottom-right"
        src="/images/user-images/bottom-right.svg"
        alt="ilustration card3"
      />
    </div>
    <div class="content">
      <figure class="image is-128x128">
        <img
          class="is-rounded"
          src="https://bulma.io/images/placeholders/128x128.png"
          alt="img"
        />
      </figure>
      <div class="icons">
        <div on:click={view}>
          <img src="/images/view-icon.svg" alt="view icon" />
        </div>
        <div on:click={edit}>
          <img src="/images/edit-icon.svg" alt="edit" />
        </div>
        <div on:click={remove}>
          <img src="/images/trash-icon.svg" alt="trash" />
        </div>
      </div>
      <div class="texto">
        <h1 class="text-menu">{user.apodo}</h1>
        <p class="light-text">Puesto</p>
      </div>
      <div class="botom-icons">
        <div class="info">
          <div class="icon">
            <img src="/images/user-contact.svg" alt="user contact" />
          </div>
          {#if user.asignacion_familiar}
            <div class="icon2">
              <img src="/images/user-house.svg" alt="user house" />
            </div>
          {/if}
          <div class="texto">
            <p>{user.contacto}</p>
          </div>
          {#if user.asignacion_familiar}
            <div class="texto2">
              <p>Asignación <br />familiar</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="cartas">
    <div class="mask">
      <div class="middle-img">
        <img class="middle" src="/images/user-images/big-middle.svg" alt="" />
      </div>
      <img
        class="middle-left"
        src="/images/user-images/middle-left.svg"
        alt="ilustration card"
      />
      <img
        class="bottom-left"
        src="/images/user-images/bottom-left.svg"
        alt="ilustration card2"
      />
      <img
        class="bottom-right"
        src="/images/user-images/bottom-right.svg"
        alt="ilustration card3"
      />
    </div>
    <div class="content-plus" on:click={addNewUser}>
      <img src="/images/plus-user.svg" alt="plus user" />
    </div>
  </div>
{/if}

<style lang="scss">
  .cartas {
    background-color: white;
    min-height: 450px;
    border-radius: 30px;
    position: relative;
    color: #353e6c !important;
    z-index: 0;
    .content-plus {
      height: 100%;
      width: 100%;
      z-index: 3;
      background: #8da1b5;
      opacity: 0.5;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        transition: width 800ms, height 800ms;
      }
      img:hover {
        width: 70px;
        height: 70px;
      }
    }
    .content {
      display: flex;
      position: inherit;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      .texto {
        display: flex;
        flex-direction: column;
        align-items: center;
        .text-menu {
          color: #353e6c !important;

          font-size: 18px;
        }
      }
      figure {
        margin-top: 24px;
        border: 5px solid white;
        border-radius: 100%;
      }
      .icons {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0.5rem;
        margin-bottom: 0.8rem;
        div {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          background: #baccfd;
          width: 35px;
          height: 35px;
        }
        div:hover {
          opacity: 0.7;
        }
      }
      .info {
        display: grid;
        grid-template-areas:
          "icon icon2"
          "text text2";
        min-height: 2rem;
        margin-top: 1.5rem;
        .icon {
          grid-area: icon;
          display: flex;
          justify-content: center;
          align-items: center;
          

          width: 100%;
          height: 100%;
        }
        .icon2 {
          grid-area: icon2;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 0.5rem;
          border-left: 2px dashed #353e6c;
          width: 100%;
          height: 100%;
        }
        .texto {
          margin-top: 0.2rem;
          grid-area: text;
          text-align: center;
          width: 100%;
          padding-right: 0.5rem;

          p {
            font-family: infraLight;
            font-size: 14px;
          }
        }
        .texto2 {
          margin-top: 0.2rem;
          width: 100%;
          grid-area: text2;
          text-align: center;
          padding-left: 0.5rem;
          border-left: 2px dashed #353e6c;

          p {
            font-family: infraLight;
            font-size: 14px;
          }
        }
      }
    }
    .mask {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      position: absolute;
      height: 100%;
      width: 100%;
      img {
        position: absolute;
      }
      .middle-img {
        .middle {
          position: absolute;
          margin-left: auto;
          margin-right: auto;
          top: 20px;
          left: 0;
          bottom: 0;
          right: 0;
        }
      }
      .middle-left {
        margin-top: auto;
        margin-bottom: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      .bottom-left {
        bottom: 0;
      }
      .bottom-right {
        right: 0;
        bottom: 20px;
      }
    }
  }
</style>
