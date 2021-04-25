<script>
    import { createEventDispatcher } from "svelte";
    export let title = "";
    export let list = [];
    export let selected;

    let isHidden = true;
    const dispatch = createEventDispatcher();

    const changeSelect = (id, nombre, index) => {
        dispatch("changeSelect", { id: id, nombre: nombre, index: index });
    };
</script>

<style lang="scss">
    .no-button {
        border: none;
        color: #5e81f4;
        background: none;
        font-size: 16px;
        font-family: infraSemiBold;
        padding: 0 !important;
        svg {
            margin-left: 0.5rem;
        }
        cursor: pointer;
    }
    .no-button:focus {
        color: #5e81f4;
        border: none !important;
        outline: none;
    }
    .wrapper-list {
        position: relative;
        z-index: 1;
        .box {
            position: absolute;
            padding: 0;
            ul {
                li {
                    color:#353E6C;
                    padding: 0.8rem;
                }
                li.liselected {
                    background-color: #BACCFD;
                }
                li:hover {
                    cursor: pointer;
                    background-color: rgba($color: #cecece, $alpha: 0.5);
                }
            }
        }
    }
    .show {
        visibility: visible !important;
    }
    .hide {
        visibility: hidden !important;
    }
    .dropdown {
        grid-area: dropdown;
        position: relative;
        display: block;
    }
</style>

<div class="dropdown">
    <button
        class="no-button "
        on:click={() => {
            isHidden = !isHidden;
        }}>
        {title}
        <svg
            width="14"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1 1L6 6L11 1"
                stroke="#5E81F4"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </button>
    <div
        class="wrapper-list"
        class:hide={isHidden === true}
        class:show={isHidden === false}>
        <div class="box">
            <ul>
                {#each list as item, i}
                    {#if i === selected}
                        <li
                            class="liselected"
                            on:click={() => {
                                changeSelect(item.id, item.nombre, i);
                                isHidden = true;
                            }}
                            id={item.id}>
                            {item.nombre}
                        </li>
                    {:else}
                        <li
                            on:click={() => {
                                changeSelect(item.id, item.nombre, i);
                                isHidden = true;
                            }}
                            id={item.id}>
                            {item.nombre}
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
</div>
