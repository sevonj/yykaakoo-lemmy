<script setup lang="ts">
import SpeechBubble from '@/components/common/SpeechBubble.vue'
import { ref } from 'vue'

const userField = ref('')
const passField = ref('')
</script>

<template>
  <main>
    <div class="login-container">
      <SpeechBubble class="login-box">
        <template v-slot:content>
          <div class="login-content">
            <h1>Login</h1>
            <form class="login-form">
              <span>
                <div class="user-field-at">@</div>
                <input
                  class="user-field"
                  v-model="userField"
                  type="username"
                  placeholder="me@example.com"
                  required
                />
              </span>
              <input v-model="passField" type="password" placeholder="Password" required />
              <input type="submit" value="Log in" />
              <!--p>No account? <a>Register</a>
                     </p>
                     <p><a>Forgor?</a></p-->
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
