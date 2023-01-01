<script>
import { progressStore } from "../progressStore";
</script>

<main>
  <img
    id="profile-picture"
    src="https://avatars.githubusercontent.com/u/35682881"
    alt="THE WOKE KOALA"
  />
  <h1 on:click={() => $progressStore.headerUnlocked = true}>NICO KANDUT</h1>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }

  #profile-picture {
    border-radius: 50%;
    margin: auto;
    grid-column: 2 /3;
    grid-row: 2 / 3;
    border: 0.5rem solid var(--default-foreground);
  }

  h1 {
    text-align: center;
    font-size: 72px;
    font-family: "Titania";
    grid-column: 2 /3;
    grid-row: 3 / 3;
  }
</style>
