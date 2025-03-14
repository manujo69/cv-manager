<template>
    <div class="dashboard-container">
      <dashboard-layout />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import DashboardLayout from '@/components/dashboard/DashboardLayout.vue'  
  
  export default defineComponent({
    name: 'DashboardView',
    components: {
      DashboardLayout
    }
  })
  </script>