<template>
  <div class="dashboard-layout">
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Mi Perfil Profesional</h2>
        <p v-if="user">{{ user.name }}</p>
      </div>
      <navigation-menu />
    </div>

    <div class="main-content">
      <div class="dashboard-header">
        <button class="logout-btn" @click="logout">Cerrar sesión</button>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { User } from '../../models'
import NavigationMenu from '@/components/dashboard/NavigationMenu.vue'

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    NavigationMenu,
  },
  data() {
    return {
      user: null as User | null,
    }
  },
  created() {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      this.user = JSON.parse(userStr)
    }
  },
  methods: {
    logout(): void {
      localStorage.removeItem('user')
      this.$router.push({ name: 'Login' })
    },
  },
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Open Sans', sans-serif;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar-header {
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 15px;
}

.main-content {
  flex: 1;
  padding: 20px;
  background: #f4f7fa;
}

.dashboard-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
