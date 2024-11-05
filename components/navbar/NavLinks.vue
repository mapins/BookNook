<script setup></script>
<template>
  <section class="nav-link">
    <ul class="nav-link__ul">
      <li class="nav-link__li"><a href="#">Inicio</a></li>
      <li class="nav-link__li"><a href="#">Mis Libros</a></li>
      <li class="nav-link__li"><a href="#">Descubrimientos</a></li>
      <li class="nav-link__li"><a href="#">Calificaciones</a></li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.nav-link {
  @include responsive() {
    width: 100%;
    margin: 0;
  }
  &__ul {
    @include flex($gap: 1em);
    margin: 0 0 0 1rem;
    @include responsive() {
      width: 100%;
      @include flex(column, flex-start);
      margin: 0;
    }
  }
  &__li {
    max-height: 4em;
  }
}
</style>
