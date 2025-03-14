<template>
  <div class="personal-info-form-component">
    <form @submit.prevent="saveInfo">
      <div>
        <label for="name">Nombre:</label>
        <input id="name" v-model="editableInfo.firstName" type="text" required />
      </div>

      <div>
        <label for="surname">Apellidos:</label>
        <input id="surname" v-model="editableInfo.lastName" type="text" required />
      </div>

      <div>
        <label for="email">Correo Electrónico:</label>
        <input id="email" v-model="editableInfo.email" type="email" required />
      </div>

      <div>
        <label for="phone">Teléfono:</label>
        <input id="phone" v-model="editableInfo.phone" required />
      </div>

      <div>
        <label for="country">País:</label>
        <input id="country" v-model="editableInfo.country" required />
      </div>

      <div>
        <label for="city">País:</label>
        <input id="city" v-model="editableInfo.city" required />
      </div>

      <div>
        <label for="address">Dirección:</label>
        <input id="address" v-model="editableInfo.address" />
      </div>

      <div>
        <label for="postalCode">Código postal:</label>
        <input id="postalCode" v-model="editableInfo.postalCode" />
      </div>

      <div>
        <label for="about">Sobre mí:</label>
        <textarea id="about" v-model="editableInfo.about"></textarea>
      </div>

      <div>
        <label for="profilePicture">Foto de perfil:</label>
        <input id="postalCode" v-model="editableInfo.profilePicture" />
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, computed, onMounted } from 'vue'
import { useStore, mapState, mapActions } from 'vuex'

import type { PersonalInfo } from '../../models'

export default defineComponent({
  name: 'PersonalInfoForm', // Optional: Give your component a name
  emits: ['close'],
  methods: {
    ...mapActions('personal', ['loadPersonalInfo', 'savePersonalInfo']),
  },
  computed: {
    ...mapState('personal', ['personalInfo']),
  },
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
      console.log(editableInfo)
      store.dispatch('personal/savePersonalInfo', { ...editableInfo })
      emit('close')
    }

    return {
      personalInfo,
      editableInfo,
      saveInfo,
    }
  },
})
</script>

<style lang="scss" scoped>
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
</style>
