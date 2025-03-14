<template>
  <nav class="navigation-menu">
    <ul>
      <li>
        <router-link to="/dashboard/personal"> Datos Personales </router-link>
      </li>
      <li>
        <router-link to="/dashboard/experience"> Experiencia Laboral </router-link>
      </li>
      <li>
        <router-link to="/dashboard/education"> Estudios Realizados </router-link>
      </li>
      <li>
        <router-link to="/dashboard/resume"> Generar Currículum </router-link>
      </li>
      <li>
        <router-link to="/dashboard/jobs"> Ofertas de Trabajo </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationMenu',
})
</script>

<style scoped>
.navigation-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navigation-menu li {
  margin-bottom: 10px;
}

.navigation-menu a {
  color: #ecf0f1;
  text-decoration: none;
  display: block;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background 0.3s;
  font-family: 'Open Sans', sans-serif;
}

.navigation-menu a:hover,
.navigation-menu a.router-link-active {
  background: rgba(255, 255, 255, 0.1);
}
</style>
