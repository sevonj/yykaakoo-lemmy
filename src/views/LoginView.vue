<script setup lang="ts">
import SpeechBubble from '@/components/common/SpeechBubble.vue'
import { LemmyHttp, type Login, type LoginResponse } from 'lemmy-js-client'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const appInstance = getCurrentInstance()
const router = useRouter()

const userField = ref('')
const passField = ref('')
const totpField = ref('')

let userName: string | undefined
let instanceUrl: URL | undefined
const busy = ref(false)
const canSubmit = ref(false)

const errorMsg = ref<string | undefined>()

function onChanged(): void {
  userName = undefined
  instanceUrl = undefined
  canSubmit.value = false

  if (passField.value.length == 0) {
    return
  }

  const input = userField.value
  const split = input.split('@')

  if (split.length != 2) {
    return
  }

  let url
  try {
    url = new URL('https://' + split[1])
  } catch {
    return
  }

  userName = split[0]
  instanceUrl = url
  canSubmit.value = true
}

async function submitLogin(): Promise<void> {
  if (!userName || !instanceUrl || !passField.value || busy.value) {
    return
  }
  if (!appInstance) {
    errorMsg.value = 'App instance is undefined'
    return
  }
  busy.value = true

  const form: Login = {
    username_or_email: userName,
    password: passField.value,
  }
  if (totpField.value.length > 0) {
    form.totp_2fa_token = totpField.value
  }

  const newClient = new LemmyHttp(instanceUrl.origin)

  try {
    const response: LoginResponse = await newClient.login(form)

    if (response.jwt) {
      newClient.setHeaders({ Authorization: `Bearer ${response.jwt}` })
      appInstance.appContext.config.globalProperties.$client = newClient
      appInstance.appContext.config.globalProperties.$instanceUrl.value = instanceUrl
      appInstance.appContext.config.globalProperties.$localSite.value = await newClient.getSite()
      router.push('/')
    } else {
      errorMsg.value = "Server didn't return JWT"
    }
  } catch (e) {
    errorMsg.value = e + ''
  }

  busy.value = false
}

watch(
  () => userField.value,
  () => onChanged(),
)

watch(
  () => passField.value,
  () => onChanged(),
)
</script>

<template>
  <main>
    <p v-if="errorMsg">{{ errorMsg }}</p>
    <div class="login-container">
      <SpeechBubble class="login-box">
        <template v-slot:content>
          <div class="login-content">
            <h1>Login</h1>
            <form class="login-form" v-on:submit="submitLogin" @submit.prevent>
              <span>
                <div class="user-field-at">@</div>
                <input
                  class="user-field"
                  v-model="userField"
                  type="username"
                  placeholder="me@example.com"
                  required
                  :disabled="busy"
                />
              </span>
              <input
                v-model="passField"
                type="password"
                placeholder="Password"
                required
                :disabled="busy"
              />
              <input
                v-model="totpField"
                type="text"
                placeholder="TOTP (if needed)"
                :disabled="busy"
              />
              <input type="submit" value="Log in" :disabled="!canSubmit || busy" />
              <!--
                p>No account? <a>Register</a>
                </p>
                <p><a>Forgor?</a></p
              -->
            </form>
          </div>
        </template>
      </SpeechBubble>
    </div>
  </main>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-box {
  max-width: 500px;
}

.login-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px;
  padding-bottom: 16px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-field-at {
  max-width: 0;
  max-height: 0;
  position: relative;
  left: 3px;
  color: var(--color-text);
}

.user-field {
  padding-left: 16px;
}
</style>
