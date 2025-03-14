<template>
  <div class="my-component">
    <!-- Content of the component -->
    <p><b>Nombre completo: </b>{{ personalInfo?.firstName }} {{ personalInfo?.lastName }}</p>
    <p><b>Email: </b>{{ personalInfo?.email }}</p>
    <p><b>Teléfono: </b>{{ personalInfo?.phone }}</p>
    <p>
      <b>Dirección: </b>{{ personalInfo?.address }} {{ personalInfo?.postalCode }}
      {{ personalInfo?.city }} {{ personalInfo?.country }}
    </p>
    <p><b>Acerca de mí: </b>{{ personalInfo?.about }}</p>

    <button @click="$emit('toggleEdit')">Editar</button>
  </div>
</template>

<script lang="ts">
import { PersonalInfo } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

export default defineComponent({
  name: 'PersonalInfoList',
  methods: {
    ...mapActions('personal', ['loadPersonalInfo']),
  },
  computed: {
    ...mapState('personal', ['personalInfo']),
  },
  emits: ['toggleEdit'],
  setup() {
    // Optional: Use the Composition API
    const store = useStore()

    const personalInfo = computed(() => store.state.personal.personalInfo)

    const editableInfo = reactive<PersonalInfo>({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      city: '',
      postalCode: '',
      about: '',
      profilePicture: null,
    })

    // Sincronizar editableInfo con el store
    watch(
      personalInfo,
      (newInfo) => {
        if (newInfo) {
          Object.assign(editableInfo, newInfo)
        }
      },
      { immediate: true },
    )

    // Cargar datos guardados en localStorage cuando el componente se monta
    onMounted(() => {
      store.dispatch('personal/loadPersonalInfo')
    })

    return {
      personalInfo,
      editableInfo,
    }
  },
})
</script>

<style scoped>
.my-component {
  /* Styles specific to this component */
  border: 1px solid #ccc;
  padding: 10px;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
