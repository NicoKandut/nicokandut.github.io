<div>
  <div class="disk">
    <div class="center">
      <div class="hole" />
    </div>
  </div>
</div>

<style>
  @keyframes spin {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  .disk,
  .center {
    display: grid;
    place-items: center;
    border-radius: 50%;
  }

  .disk {
    --size: 180px;

    flex-shrink: 0;
    background: #111;
    height: var(--size);
    width: var(--size);
    animation: spin 2s linear infinite;
    animation-play-state: paused;
  }

  .disk:hover {
    animation-play-state: running;
  }

  .center {
    background: url(https://m.media-amazon.com/images/I/71VK-Qo6ZgL._SY355_.jpg);
    background-size: cover;
    height: 33.3%;
    width: 33.3%;
  }

  .hole {
    border-radius: 50%;
    background-color: var(--default-background);
    border: 2px solid var(--default-foreground);
    height: 10%;
    width: 10%;
  }

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
