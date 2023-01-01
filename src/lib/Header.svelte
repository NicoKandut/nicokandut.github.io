<script>
  import ShortLink from "./ShortLink.svelte";
</script>

<header>
  <div class="titles">
    <span>#666</span>
    <span>jkjk</span>
  </div>
  <div class="content">
    <span>
      <a href="https://github.com/NicoKandut">NicoKandut</a>//GH
    </span>

    <span>
      <a href="https://www.linkedin.com/in/nico-kandut-8945a8207/">NicoKandut</a
      >//LNK
    </span>
    <div>
      <!-- <a class="square" />
      <a class="circle" />
      <a class="circle" /> -->
    </div>
  </div>
  <div class="titles">
    <ShortLink
      href="https://open.spotify.com/user/haleluni1"
      title="SP"
      color="#1DB954"
    />
    <ShortLink
      href="https://github.com/NicoKandut"
      title="GH"
      color="#58a6ff"
    />
    <ShortLink
      href="https://soundcloud.com/nico-nico-nightcore"
      title="SC"
      color="#f50"
    />
    <ShortLink
      href="https://www.last.fm/user/haleluni"
      title="LF"
      color="#d92323"
    />
  </div>
</header>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }

  .titles span {
    background-color: var(--default-foreground);
    color: var(--default-background);
    padding: 0 0.4rem;
  }

  .content {
    font-weight: bold;
    border-block: 2px solid var(--default-foreground);
  }
</style>
