<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showIntro = computed(() => {
  return route.name !== 'Home'
})

</script>