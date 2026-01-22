<template>
  <div v-html="vector"></div>
</template>

<script setup lang="ts">
interface Props {
  vector: string,
}
defineProps<Props>();
</script>