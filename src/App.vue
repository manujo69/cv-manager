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

<style>
.p-select-overlay,
.p-select-list,
.p-select-option,
.p-select-option-label {
  font-family: 'Open Sans', sans-serif !important;
}

.p-card.p-component {
  background: #eee;
}

.p-datepicker-day,
.p-datepicker-weekday,
.p-datepicker-month,
.p-datepicker-year,
.p-datepicker-decade,
.p-datepicker-today,
.p-datepicker-select-month,
.p-datepicker-select-year {
  font-family: 'Open Sans', sans-serif;
}

h2 {
  color: white;
  font-weight: 800;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 60%);
}
</style>
