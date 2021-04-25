<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const closeModal = () => {
        dispatch("close");
    };
</script>

<div class="modal is-active">
    <div class="modal-background" on:click={closeModal} />
    <div class="modal-content">
        <div class="box">
            <div class="icon-close" on:click={closeModal}>
                <img src="/images/menu-close.svg" alt="closeIcon" />
            </div>

            <div class="titulo-container" />
            <div class="mensaje" />
        </div>
    </div>
    
</div>

<style lang="scss">
    .modal-content {
        overflow: hidden;
        min-height: 300px;
        .box {
            border-radius: 30px;
            box-shadow: none!important;
            height: 100%;
            width: 100%;
            position: relative;
            scrollbar-width: 0;
            .icon-close {
                cursor: pointer;
                position: absolute;
                right: 24px;
            }
        }
    }
</style>
