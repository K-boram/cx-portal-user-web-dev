<script setup lang="ts">
import { h } from 'vue'
import { Mode } from '~/types/enums/content-card'
import type { IBookMarkChangedData, ISaveContentData } from '~/types/content-card'
import Icon from '~/components/Icon.vue'

const props = withDefaults(defineProps<{
  copySno: string
  rank?: string
  sentiment: string
  copy: string
  isBookMark: boolean
  useLocationBookMark?: boolean
  editedId?: string
  copyLen: number
}>(), {
  rank: '',
  editedId: '',
  useLocationBookMark: false,
})

const emit = defineEmits<{
  (e: 'changeEditedId', value: string): void
  (e: 'saveContent', value: ISaveContentData): void
  (e: 'changeBookMark', value: IBookMarkChangedData): void
}>()

const isMode = ref<Mode>(Mode.VIEW)
const copy = ref<string>(props.copy)

const changeEditMode = () => {
  isMode.value = Mode.EDIT
  emit('changeEditedId', props.copySno)
}
const changeViewMode = async () => {
  try {
    await openCustomConfirm(
      h('div', { class: 'use-icon' }, [
        h(Icon, { name: 'success__line--03b', width: '52', height: '52', class: 'popup__icon' }),
        h('p', { class: 'popup__title' }, '취소 하시겠습니까? 입력하신 정보는 사라지게 됩니다.'),
      ]),
      {
        center: true,
        hideCancelButton: false,
        closeOnPressEscape: true,
        showClose: true,
        title: '',
      },
    )
    // textarea 에서 수정했던 내용 삭제
    copy.value = props.copy
    isMode.value = Mode.VIEW
    emit('changeEditedId', '')
    openToast({
      message: '취소되었습니다.',
      showClose: true,
    })
  }
  catch (error) {
    if (error !== 'cancel')
      console.error(error)
  }
}

const checkEditId = computed(() => {
  if (!isEmpty(props.editedId))
    return props.editedId === props.copySno
  else
    return true
})

const changeBookMark = async () => {
  const data: IBookMarkChangedData = {
    copySno: props.copySno,
    isBookMark: !props.isBookMark,
  }
  try {
    if (props.isBookMark) {
      await openCustomConfirm(
        h('div', { class: 'use-icon' }, [
          h(Icon, { name: 'warning__line--fa2', width: '52', height: '52', class: 'popup__icon' }),
          h('p', { class: 'popup__title' }, '북마크를 해제 하시겠습니까?'),
          h('p', { class: 'popup__subtitle' }, '북마크 해제된 카피라이터는 내 북마크에서 제외됩니다.'),
        ]),
        {
          center: true, // content 가운데 정렬 여부 입니다.
          closeOnPressEscape: true, // ESC버튼을 누르면 alert창이 꺼지는 기능 입니다.
          showClose: true, // X표시로 컨펌창을 끄는 기능 입니다.
          title: '',
        },
      )
    }
    // await changeBookMarkApi(data)
    emit('changeBookMark', data)
  }
  catch (error) {
    if (error !== 'cancel')
      console.error(error)
  }
}

// TODO: API 적용 필요
const saveContent = async () => {
  const data: ISaveContentData = {
    copy: copy.value,
    copySno: props.copySno,
  }
  try {
    await openCustomConfirm(
      h('div', { class: 'use-icon' }, [
        h(Icon, { name: 'success__line--03b', width: '52', height: '52', class: 'popup__icon' }),
        h('p', { class: 'popup__title' }, '작성한 정보를 저장 하시겠습니까?'),
      ]),
      {
        center: true,
        hideCancelButton: false,
        closeOnPressEscape: true,
        showClose: true,
        title: '',
      },
    )
    // await seveContentApi(data)
    // 저장 후 북마크 해제가 되어 있는 경우 북마크 등록
    if (!props.isBookMark)
      changeBookMark()

    // 부모 컴포넌트에서 copy 내용을 변경해준다.
    emit('saveContent', data)
    isMode.value = Mode.VIEW
    emit('changeEditedId', '')
    openToast({
      message: '저장되었습니다.',
      showClose: true,
    })
  }
  catch (error) {
    if (error !== 'cancel')
      console.error(error)
  }
}

// 특정 태그는 선택 가능하도록 예외 처리
const omitTags = ['input', 'textarea', 'select']
const disabledSelect = (e: Event) => {
  const target = e.target as HTMLElement
  // input, textarea, select 는 드래그 되도록 적용
  if (typeof target.tagName === 'undefined' || !omitTags.includes(target.tagName.toLowerCase()))
    return false
}

const disabledKeyDown = (e: Event) => {
  const target = e.target as HTMLElement

  // input, textarea, select 는 key 누를 수 있도록 적용
  if (omitTags.includes(target.tagName.toLowerCase()))
    return

  // input, textarea, select 태그 이외에서는 ctrl + a, ctrl + c 를 사용 못하도록 적용
  if (e.ctrlKey && (e.keyCode === 65 || e.keyCode == 67))
    return false
}

const contentArea = ref<HTMLParagraphElement | null>(null)

// 클립보드 복사
const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(contentArea.value!.innerText)
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  // 오른쪽 클릭 방지
  document.oncontextmenu = () => {
    return false
  }

  // 드래그 방지(드래그 하기 시작하면 발생하는 이벤트)
  document.ondragstart = () => {
    return false
  }

  // 키보드 이벤트 방지(input, textarea, select 태그 이외에서는 ctrl + a, ctrl + c 를 사용 못하도록 적용)
  document.onkeydown = disabledKeyDown

  // onselectstart 이벤트를 지원하지 않는 브라우저가 있을 수 있어서 적용
  if (typeof document.onselectstart !== 'undefined') { document.onselectstart = disabledSelect } // 전체 태그의 텍스트 선택 방지(새로운 선택을 시작할때 발생하는 이벤트)
  else {
    document.onmousedown = disabledSelect
    document.onmouseup = () => { return true }
  }
})

onBeforeUnmount(() => {
  // 오른쪽 클릭 방지 해제
  document.oncontextmenu = null
  // 드래그 방지 해제
  document.ondragstart = null
  // 키보드 이벤트 방지 해제
  document.onkeydown = null

  // onselectstart 지원 여부에 따라 해제
  if (typeof document.onselectstart !== 'undefined') {
    document.onselectstart = null
  }
  else {
    document.onmousedown = null
    document.onmouseup = null
  }
})
</script>

<template>
  <li class="copy-list__item">
    <div v-if="rank" class="copy-list__item-rank">
      <Icon :name="`rank${rank}__full`" width="38" height="30" :alt="`추천 ${rank}순위`" />
    </div>
    <div class="copy-list__item-header">
      <div class="copy-list__item-name">
        <span>감정</span>
        <em>{{ sentiment }}</em>
      </div>
      <div class="copy-list__item-btns">
        <template v-if="checkEditId">
          <template v-if="isMode === Mode.EDIT">
            <button type="button" @click="changeViewMode">
              <Icon name="reset__line--222" width="24" height="24" alt="되돌아가기" />
            </button>
            <button type="button" @click="saveContent">
              <Icon name="file__line--222" width="24" height="24" alt="저장" />
            </button>
          </template>
          <button v-if="isMode === Mode.VIEW" type="button" @click="changeEditMode">
            <Icon name="pencil__line--222" width="24" height="24" alt="수정" />
          </button>
          <button v-if="useLocationBookMark && isMode === Mode.VIEW" type="button" @click="copyContent">
            <Icon name="clipboard__line--222" width="24" height="24" alt="클립보드" />
          </button>
          <button v-if="isMode === Mode.VIEW" type="button" @click="changeBookMark">
            <Icon v-if="isBookMark" name="bookmark__full--ff0" width="24" height="24" alt="저장된 북마크" />
            <Icon v-else name="bookmark__line--222" width="24" height="24" alt="북마크" />
          </button>
        </template>
      </div>
    </div>
    <div class="copy-list__item-content">
      <p v-if="isMode === Mode.VIEW" ref="contentArea">
        {{ copy }}
      </p>
      <CustomTextarea v-else v-model="copy" :max-length="copyLen" />
    </div>
  </li>
</template>

<style lang="scss" scoped></style>
