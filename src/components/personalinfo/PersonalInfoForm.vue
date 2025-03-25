<template>
  <div class="personal-info-form-component">
    <form @submit.prevent="saveInfo">
      <div class="flex flex-col gap-2">
        <label for="firstName">Nombre </label>
        <InputText
          id="firstName"
          v-model="editableInfo.firstName"
          required
          placeholder="Nombre"
        ></InputText>
      </div>

      <div class="flex flex-col gap-2">
        <label for="lastName">Apellidos:</label>
        <InputText
          id="lastName"
          v-model="editableInfo.lastName"
          required
          placeholder="Apellidos"
        ></InputText>
      </div>

      <div class="flex flex-col gap-2">
        <label for="email">Correo Electrónico:</label>
        <InputText id="email" v-model="editableInfo.email" type="email" required></InputText>
      </div>

      <div class="flex flex-col gap-2">
        <label for="phone">Teléfono:</label>
        <InputText id="phone" v-model="editableInfo.phone" type="tel" required></InputText>
      </div>

      <div class="flex flex-col gap-2">
        <label for="country">País:</label>

        <PrimeSelect
          id="country"
          v-model="editableInfo.country"
          :options="countriesList"
          :pt="{
            root: { style: { fontFamily: 'Arial, sans-serif' } },
            label: { style: { fontFamily: 'Arial, sans-serif' } },
            item: { style: { fontFamily: 'Arial, sans-serif' } },
            itemGroup: { style: { fontFamily: 'Arial, sans-serif' } },
            panel: { style: { fontFamily: 'Arial, sans-serif' } },
          }"
          optionLabel="name"
          optionValue="name"
          required
          placeholder="Selecciona un país"
          class="prime-select w-full md:w-56"
        ></PrimeSelect>
      </div>

      <div class="flex flex-col gap-2">
        <label for="city">Ciudad:</label>
        <InputText id="city" v-model="editableInfo.city" required></InputText>
      </div>

      <div class="flex flex-col gap-2">
        <label for="address">Dirección:</label>
        <InputText id="address" v-model="editableInfo.address" required></InputText>
      </div>

      <div class="flex flex-col gap-2">
        <label for="postalCode">Código Postal:</label>
        <InputText id="postalCode" v-model="editableInfo.postalCode" required></InputText>
      </div>

      <div>
        <label for="about">Sobre mí:</label>
        <PrimeTextarea id="about" v-model="editableInfo.about"></PrimeTextarea>
      </div>

      <div>
        <label for="profilePicture">Foto de perfil:</label>
        <input id="profilePicture" v-model="editableInfo.profilePicture" />
      </div>

      <PrimeButton type="submit">Guardar</PrimeButton>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, computed, onMounted, ref } from 'vue'
import { useStore, mapState, mapActions } from 'vuex'

import type { PersonalInfo } from '../../models'

import PrimeButton from 'primevue/button'

import InputText from 'primevue/inputtext'
import PrimeTextarea from 'primevue/textarea'

import PrimeSelect from 'primevue/select'
import { countries } from '@/models/countries'

export default defineComponent({
  name: 'PersonalInfoForm', // Optional: Give your component a name
  emits: ['close'],
  methods: {
    ...mapActions('personal', ['loadPersonalInfo', 'savePersonalInfo']),
  },
  computed: {
    ...mapState('personal', ['personalInfo']),
  },
  components: { PrimeButton, InputText, PrimeTextarea, PrimeSelect },
  setup(props, { emit }) {
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

    const countriesList = ref(countries)

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

    const saveInfo = () => {
      store.dispatch('personal/savePersonalInfo', { ...editableInfo })
      emit('close')
    }

    return {
      personalInfo,
      editableInfo,
      countriesList,
      saveInfo,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/common.scss' as *;

.personal-info-form-component {
  padding: 10px;
  margin: auto;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.prime-select {
  font-family: 'Open Sans', sans-serif;
}

.prime-textarea {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem; // You can adjust the font size here if needed
}
</style>
