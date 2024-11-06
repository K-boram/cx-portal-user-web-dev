<script setup lang="ts">
import { loginApi, getSessionApi } from '~/api/login'
import { useSessionStore } from '~/store/session'

const sessionStore = useSessionStore()
const router = useRouter()

const info1 = ref<string>('')

const setSession = async () => {
  try {
    const response = await getSessionApi()
    sessionStore.setSessionInfo(response.data.body)
  } catch (error) {
    console.error(error)
  }
}

const login = async () => {

  const params = {
    info1: info1.value
  }
  try {
    if (isEmpty(info1.value)) {
      return await openAlert({
        message: '아이디를 입력해 주세요.',
        center: true,
        closeOnClickModal: false, // 모달창 외 버튼을 누르면 alert창이 꺼지는 기능입니다.
        closeOnPressEscape: true, // ESC버튼을 누르면 alert창이 꺼지는 기능 입니다.
        showClose: true, // X표시로 컨펌창을 끄는 기능 입니다.
      })
    }
    // await loginApi(params)
    // await setSession()
    router.push('/home')
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}
</script>

<template>
  <div class="flex w-full h-full justify-center items-center">
    <div class="login">
      <h2>{{ import.meta.env.DEV ? '개발망' : '통시망' }}</h2>
      <div class="mb-2">
        <custom-input v-model="info1" placeholder="아이디 입력" @keypress-enter="login" />
      </div>
      <button type="button" class="btn__full--primary-md" @click="login">로그인</button>
    </div>
  </div>
</template>

<route lang="yaml">
meta: 
  layout: empty
</route>
<style lang="scss" scoped>
.btn__full--primary-md {
  width: 100%;
}

.login {
  padding: 20px 30px;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
}
</style>