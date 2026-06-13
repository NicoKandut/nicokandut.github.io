<script module lang="ts">
      export enum Scene {
        DAY,
        NIGHT
    }
</script>

<script lang="ts">
    interface SceneProps {
        scene: Scene;
    }


</script>


<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle fill="red" cx="50" cy="50" r="40"> AAA </circle>
</svg>

<style>
  circle {
    fill: red;
  }
</style>
