<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <h1>about dengan parameter /about/{{ $route.params.id }}</h1>
</template>
