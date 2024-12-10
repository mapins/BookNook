<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Descubre tus próximos libros favoritos</h1>
      <p>
        Explora una amplia selección de libros, desde los más vendidos hasta las últimas
        novedades.
      </p>
      <div class="hero-buttons">
        <NuxtLink to="/search" class="btn-cta">Explorar libros </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style scoped>
@import '/assets/styles/load.css';

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/library.jpg');
  background-size: cover;
  background-position: center;
  height: 30rem;
  color: var(--c-white);
  text-align: center;
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero-content {
  position: relative;
  max-width: 50rem;
  margin: 0 1.25rem;
  padding: 1.25rem;
  z-index: 2;
  animation: fadeInUp 1.5s ease-out;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 0.9375rem;
}

.hero p {
  font-size: 1.3rem;
  margin-bottom: 1.5625rem;
}

.hero-buttons {
  display: flex;
  gap: 0.625rem;
  justify-content: center;
}

.btn-cta {
  padding: 0.75rem 1.5rem;
  background-color: var(--c-primary);
  color: var(--c-white);
  text-decoration: none;
  font-size: 1rem;
  border-radius: 0.3125rem;
  transition: background-color 0.3s ease;
}

.btn-cta:hover {
  background-color: var(--c-primary-dark);
}

@media (max-width: 48rem) {
  .hero h1 {
    font-size: 2.2rem;
  }
  .hero p {
    font-size: 1.1rem;
  }
  .btn-cta {
    font-size: 0.9rem;
    padding: 0.625rem 1.25rem;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(3.125rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
