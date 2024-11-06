<script setup lang="ts">
// import Modal from '~/example/components/modal/Modal.vue'
import type { MessageOptions } from 'element-plus'
import { MODAL_SIZE } from '~/types/modal'
import type { IModalPopup } from '~/types/modal'
import { IToastType } from '~/example/types/toast'
import Icon from '~/components/Icon.vue'

// ================ Modal ================
const titleName = ref<string>('모달제목')

const popup: IModalPopup = reactive({
  modalShow: {
    show: false,
    title: '제목이다',
  },
  modalNoHeader: {
    show: false,
  },
  modalNoFooter: {
    show: false
  }
})

const openModal = (modal: string) => {
  popup[modal].show = true
}
const handleCancel = (modal: string) => {
  popup[modal].show = false
}
const handleConfirmBtn = (modal: string) => {
  popup[modal].show = false
}

// ================ Confirm ================
const basicConfirm = {
  title: '정말 삭제 하시겠습니까?',
  content: '삭제 시 복구되지 않습니다.',
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  center: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
}
const handleConfirm = async () => {
  try {
    await openConfirm(basicConfirm)
  }
  catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}
// ================ Custom Confirm ================
const handleCustomConfirm = async () => {
  try {
    await openCustomConfirm({
      title: '취소 확인',
      message: '입력된 내용이 사라집니다. 정말로 취소 하시갰습니까?',
    })
  }
  catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}

// ================ Alert ================
const basicAlert = {
  message: '확인해주세요.', // message부분에 들어가는 내용을 적어주세요.
  confirmButtonText: '확인', // 확인 버튼 텍스트 입니다.
  center: false, // content 가운데 정렬 여부 입니다.
  closeOnClickModal: false, // 모달창 외 버튼을 누르면 alert창이 꺼지는 기능입니다.
  closeOnPressEscape: true, // ESC버튼을 누르면 alert창이 꺼지는 기능 입니다.
  showClose: true, // X표시로 컨펌창을 끄는 기능 입니다.
}
const handleAlert = async () => {
  try {
    await openAlert(basicAlert)
  }
  catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}

// ================ Custom Alert ================
const handleCustomAlert = async () => {
  try {
    await openCustomAlert({
      title: '다중 중분류 선택',
      message: '두개 이상의 중분류가 선택되었습니다. 같은 중분류로 선택해 주세요.',
    })
  }
  catch (error) {
    if (error !== 'cancel')
      console.error(error)
  }
}

// ================ Toast ================
const options1: MessageOptions = {
  message: '일반 toast 예제입니다.',
  // type: undefined,
  showClose: true,
}

const options2: MessageOptions = {
  message: '주의 toast 예제입니다.',
  type: IToastType.WARNING,
  showClose: true,
}

const options3: MessageOptions = {
  message: '성공 toast 예제입니다.',
  type: IToastType.SUCCESS,
  showClose: false,
}

const options4: MessageOptions = {
  message: '오류 toast 예제입니다.',
  type: IToastType.ERROR,
  showClose: false,
}

const handleToast1 = () => {
  openToast(options1)
}

const handleToast2 = () => {
  openToast(options2)
}

const handleToast3 = () => {
  openToast(options3)
}

const handleToast4 = () => {
  openToast(options4)
}
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold">
      Popup
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Confirm / Alert
      </mark>
      <div class="flex gap-3">
        <button type="button" class="btn__full--primary-md" @click="handleCustomConfirm">
          custom confirm
        </button>
        <button type="button" class="btn__full--primary-md" @click="handleCustomAlert">
          custom alert
        </button>
        <button type="button" class="btn__full--primary-md" @click="handleConfirm">
          basic confirm
        </button>
        <button type="button" class="btn__full--primary-md" @click="handleAlert">
          basic alert
        </button>
      </div>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Basic Modal
      </mark>
      <div class="flex gap-3">
        <button type="button" class="btn__full--primary-md" @click="openModal('modalShow')">
          basic
        </button>
        <button type="button" class="btn__full--primary-md" @click="openModal('modalNoHeader')">
          no header
        </button>
        <button type="button" class="btn__full--primary-md" @click="openModal('modalNoFooter')">
          no footer
        </button>
      </div>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Toast
      </mark>
      <div class="flex gap-3">
        <button type="button" class="btn__full--primary-md" @click="handleToast1">
          일반 toast
        </button>
        <button type="button" class="btn__full--primary-md" @click="handleToast2">
          주의 toast
        </button>
        <button type="button" class="btn__full--primary-md" @click="handleToast3">
          성공 toast
        </button>
        <button type="button" class="btn__full--primary-md" @click="handleToast4">
          오류 toast
        </button>
      </div>
    </div>

    <!-- basic -->
    <common-modal v-model="popup.modalShow.show" :title="titleName" :size="MODAL_SIZE.MEDIUM"
      @confirm="handleConfirmBtn('modalShow')" @cancel="handleCancel('modalShow')">
      <template #content>
        <p>모달 내용</p>
      </template>
    </common-modal>

    <!-- NoHeader (header 없는 모달) -->
    <common-modal v-model="popup.modalNoHeader.show" :close-on-click-modal="false" :size="MODAL_SIZE.LARGE">
      <template #content>
        <Icon name="success__line--03b" width="52" height="52" alt="" class="popup__icon" />
        <div class="popup__title">
          <p>Target Insight에 등록된 과제가 없습니다.</p>
          <p>과제를 등록하러 이동 하시겠습니까?</p>
        </div>
        <p class="popup__subtitle">
          * CMS 권한이 없으신 분은 권한 먼저 신청해 주세요.
        </p>
      </template>
      <template #footer>
        <button type="button" class="btn__line--negative-sm" @click="handleCancel('modalNoHeader')">
          취소
        </button>
        <button type="button" class="btn__full--primary-sm" @click="handleConfirmBtn('modalNoHeader')">
          CMS 권한 신청하기
        </button>
        <button type="button" class="btn__line--primary-sm" @click="handleConfirmBtn('modalNoHeader')">
          Target Insight로 이동
        </button>
      </template>
    </common-modal>

    <!-- NoFooter (footer 없는 모달) -->
    <common-modal v-model="popup.modalNoFooter.show" :close-on-click-modal="false" :title="titleName"
      :size="MODAL_SIZE.LARGE" :use-footer="false">
      <template #content>
        <p>모달 내용</p>
      </template>
    </common-modal>
  </div>
</template>

<style scoped></style>
