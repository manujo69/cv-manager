<template>
  <div class="item-list-component">
    <Toolbar>
      <template #start>
        <div class="personal-info-item">
          <div class="personal-info-content">
            <p>
              <b>Nombre completo: </b>{{ personalInfo?.firstName }} {{ personalInfo?.lastName }}
            </p>
            <p><b>Email: </b>{{ personalInfo?.email }}</p>
            <p><b>Teléfono: </b>{{ personalInfo?.phone }}</p>
            <p>
              <b>Dirección: </b>{{ personalInfo?.address }} {{ personalInfo?.postalCode }}
              {{ personalInfo?.city }} - {{ personalInfo?.country }}
            </p>
            <p><b>Acerca de mí: </b>{{ personalInfo?.about }}</p>
          </div>
        </div>
      </template>
      <template #end>
        <PrimeButton
          @click="$emit('toggleEdit')"
          icon="pi pi-pen-to-square"
          severity="secondary"
          text
        />
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts">
import { PersonalInfo } from '@/models'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { mapActions, mapState, useStore } from 'vuex'

import PrimeButton from 'primevue/button'
import Toolbar from 'primevue/toolbar'

export default defineComponent({
  name: 'PersonalInfoList',
  methods: {
    ...mapActions('personal', ['loadPersonalInfo']),
  },
  computed: {
    ...mapState('personal', ['personalInfo']),
  },
  components: { PrimeButton, Toolbar },
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

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;

.item-list-component {
  .personal-info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0 1rem;
    border-radius: 0.5rem;

    .personal-info-content {
      flex: 1;
      p {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
