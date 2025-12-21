<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#3b82f6" :height="5" :duration="2000" :throttle="200" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
