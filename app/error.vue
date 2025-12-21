<template>
  <div class="error-page">
    <div class="error-content">
      <div v-if="error.statusCode === 404">
        <div class="icon-404">🔍</div>
        <h1 class="error-code">404</h1>
        <p class="error-message">Halaman yang Anda cari tidak ditemukan</p>
        <p class="error-description">URL mungkin salah atau halaman telah dipindahkan</p>
      </div>
      <div v-else>
        <h1 class="error-code">{{ error.statusCode || 500 }}</h1>
        <p class="error-message">{{ error.message || "Terjadi kesalahan" }}</p>
      </div>

      <NuxtLink to="/" class="home-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
});
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.error-content {
  text-align: center;
  color: white;
  animation: fadeIn 0.6s ease-out;
}

.error-code {
  font-size: clamp(80px, 15vw, 180px);
  font-weight: 900;
  margin: 0;
  line-height: 1;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.error-message {
  font-size: clamp(18px, 3vw, 24px);
  margin: 20px 0 40px;
  opacity: 0.95;
  font-weight: 500;
}

.error-description {
  font-size: clamp(14px, 2.5vw, 16px);
  margin: -20px 0 40px;
  opacity: 0.85;
  font-weight: 400;
}

.icon-404 {
  font-size: clamp(60px, 10vw, 80px);
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.home-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.home-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: #f8f9fa;
}

.home-link svg {
  transition: transform 0.3s ease;
}

.home-link:hover svg {
  transform: translateX(-3px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .error-page {
    padding: 16px;
  }

  .error-message {
    margin: 16px 0 32px;
  }

  .home-link {
    padding: 12px 24px;
    font-size: 14px;
  }
}
</style>
