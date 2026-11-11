<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: '', password: '' })
const errors = ref<{ email?: string; password?: string }>({})
const formError = ref('')
const submitting = ref(false)

function validate(): boolean {
  errors.value = {}
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.value.email = 'Enter a valid email'
  if (form.password.length < 8) errors.value.password = 'Password must be at least 8 characters'
  return Object.keys(errors.value).length === 0
}

async function onSubmit() {
  formError.value = ''
  if (!validate()) return
  submitting.value = true
  try {
    const ok = await auth.login(form.email)
    if (!ok) {
      formError.value = 'Wrong email or password'
      return
    }
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirect)
  } catch (e) {
    formError.value = e instanceof Error ? e.message : 'Something went wrong'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <h1>Log in</h1>
  <form novalidate @submit.prevent="onSubmit">
    <label>
      Email
      <input v-model="form.email" type="email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </label>
    <label>
      Password
      <input v-model="form.password" type="password" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </label>
    <p v-if="formError" class="error">{{ formError }}</p>
    <button type="submit" :disabled="submitting">Log in</button>
  </form>
  <p><small>Demo users: dara@example.com (reader), admin@example.com (admin)</small></p>
</template>

<style scoped>
form {
  display: grid;
  gap: 0.75rem;
  max-width: 24rem;
}
label {
  display: grid;
  gap: 0.25rem;
}
.error {
  color: #c00;
  font-size: 0.85rem;
}
</style>
