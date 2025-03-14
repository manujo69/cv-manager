<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Open Sans';
  src:
    url('@/assets/fonts/OpenSans/OpenSans-Regular.woff2') format('woff2'),
    url('@/assets/fonts/OpenSans/OpenSans-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Open Sans';
  src:
    url('@/assets/fonts/OpenSans/OpenSans-Bold.woff2') format('woff2'),
    url('@/assets/fonts/OpenSans/OpenSans-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}

body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  margin: 0;
  padding: 0;
}
</style>
