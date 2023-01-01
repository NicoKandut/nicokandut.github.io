<script lang="ts">
  export let title: string;
  export let href: string;
  export let color: string;
</script>

<a {href} style="--color: {color}">&gt;&gt;{title}</a>

<style>
  a {
    background-color: var(--default-foreground);
    color: var(--default-background);
    padding: 0 0.4rem;
    text-decoration: none;
    transition: color 0.1s linear;
  }

  a:visited {
    color: var(--default-background);
  }

  a:hover {
    color: var(--color);
  }
</style>
