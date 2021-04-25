<script>
  import FloweredConered from "../_components/FloweredConered.svelte";
</script>

<div class="container-index">
  <FloweredConered />
  <slot />
</div>

<style>
  .container-index {
    position: relative;
    background-color: white;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
