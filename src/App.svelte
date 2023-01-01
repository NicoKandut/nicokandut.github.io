<script lang="ts">
  import { progressStore } from "./progressStore";
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import Main from "./lib/Main.svelte";
</script>

{#if $progressStore.headerUnlocked}
  <Header />
{/if}

<Main />

{#if $progressStore.footerUnlocked}
  <Footer />
{/if}

<style>
  @font-face {
    font-family: "Titania";
    font-style: normal;
    font-weight: normal;
    src: local("Titania"), url("/Titania-Regular.woff") format("woff");
  }

  :root {
    font-family: "Poppins", sans-serif;

    --default-background: white;
    --default-foreground: #333333;
    --link-foreground: #2767df;
  }

  :global(html) {
    background-color: var(--default-background);
    color: var(--default-foreground);
  }

  :global(body) {
    max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
  }

  :global(a) {
    color: var(--link-foreground);
    text-decoration: none;
  }
</style>
