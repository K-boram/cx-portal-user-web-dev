<script lang="ts" setup>
// 파일 업로드 버튼
import Upload from '~/example/components/upload/Upload.vue'

function fileSuccess(files: Resumable.ResumableFile[], response: string) {
  console.log(files)
  console.log(response)
}

const upload = []
const uploadfile = ['upload1', 'upload2', 'upload3']
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Button
    </h2>
    <div class="flex flex-col gap-2 mt-10 p-10 bg-white rounded-3xl">
      <p>button size는 <em class="font-bold">"sm", "md", "lg(default)"</em>가 있습니다.</p>
      <p>
        icon 넣을 때 <em class="font-bold">$type이 line인 경우</em> Icon 컴포넌트가 아닌, <em class="font-bold">svg</em>태그를 사용합니다.
      </p>
      <p>
        유동적으로 width 값이 변하는 버튼에는 <em class="font-bold">class에 "is-flexible"</em> 을 추가합니다.
      </p>
      <p>
        두 개 이상의 버튼은 수평 정렬인 경우 <em class="font-bold">"btn__group"</em>으로, 수직 정렬인 경우 <em
          class="font-bold">"btn__group--col"</em>로 감싸줍니다.
      </p>
    </div>

    <!-- btn__primary -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__primary
      </mark>
      <div class="btn__group">
        <button type="button" class="btn__primary--sm">
          size sm
        </button>
        <button type="button" class="btn__primary--md">
          size md
        </button>
        <button type="button" class="btn__primary">
          size lg (default)
        </button>
        <button type="button" class="btn__primary">
          <span>icon</span>
          <Icon name="check__line--fff" width="12" height="12" alt="" aria-hidden="true" />
        </button>
        <button type="button" disabled class="btn__primary">
          disabled
        </button>
        <button type="button" class="btn__primary w-270">
          width 270px (Use Under Table)
        </button>
      </div>
      <div class="btn__group my-2">
        <button type="button" class="btn__primary is-flexible">
          is-flexible
        </button>
        <button type="button" class="btn__primary is-flexible">
          is-flexible
        </button>
      </div>
      <div class="btn__group--col">
        <button type="button" class="btn__primary">
          btn__group--col
        </button>
        <button type="button" class="btn__primary">
          btn__group--col
        </button>
      </div>
    </div>
    <hr>

    <!-- btn__primary-line -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__primary-line
      </mark>
      <div class="btn__group">
        <button type="button" class="btn__primary-line--sm">
          size sm
        </button>
        <button type="button" class="btn__primary-line--md">
          size md
        </button>
        <button type="button" class="btn__primary-line">
          size lg (default)
        </button>
        <button type="button" class="btn__primary-line">
          <span>icon</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M2.64645 5.14645C2.84171 4.95118 3.15829 4.95118 3.35355 5.14645L6 7.79289L8.64645 5.14645C8.84171 4.95118 9.15829 4.95118 9.35355 5.14645C9.54882 5.34171 9.54882 5.65829 9.35355 5.85355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.64645 5.85355C2.45118 5.65829 2.45118 5.34171 2.64645 5.14645Z"
              fill="#EC008B" />
            <rect y="10" width="12" height="1" rx="0.5" fill="#EC008B" />
            <path
              d="M5.5 0.5C5.5 0.223858 5.72386 0 6 0C6.27614 0 6.5 0.223858 6.5 0.5V7.5C6.5 7.77614 6.27614 8 6 8C5.72386 8 5.5 7.77614 5.5 7.5V0.5Z"
              fill="#EC008B" />
          </svg>
        </button>
        <button type="button" disabled class="btn__primary-line">
          disabled
        </button>
      </div>
    </div>
    <hr>

    <!-- btn__secondary -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__secondary
      </mark>
      <button type="button" class="btn__secondary">
        공통
      </button>
    </div>
    <hr>

    <!-- btn__secondary-line -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__secondary-line
      </mark>
      <button type="button" class="btn__secondary-line">
        모바일
      </button>
    </div>
    <hr>

    <!-- btn__negative-line -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__negative-line
      </mark>
      <div class="btn__group">
        <button type="button" class="btn__negative-line--sm">
          size sm
        </button>
        <button type="button" class="btn__negative-line--md">
          size md
        </button>
        <button type="button" class="btn__negative-line">
          size lg (default)
        </button>
        <button type="button" disabled class="btn__negative-line">
          disabled
        </button>
      </div>
    </div>

    <!-- btn__text -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__text
      </mark>
      <div class="btn__group">
        <button type="button" class="btn__text">
          btn__text
        </button>
        <button type="button" class="btn__text--bold">
          btn__text--bold
        </button>
      </div>
    </div>
    <hr>

    <!-- btn__icon -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__icon
      </mark>
      <div class="btn__group">
        <button type="button" class="btn__icon--md">
          <Icon name="add__line--333" width="16" height="16" alt="추가" />
        </button>
        <button type="button" class="btn__icon--sm">
          <Icon name="delete__line--333" width="8" height="8" alt="삭제" />
        </button>
      </div>
    </div>
    <hr>

    <!-- btn__upload -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        btn__upload
      </mark>
      <div class="flex flex-col gap-4">
        <!-- 파일 업로드 버튼(default) -->
        <Upload format="file" :upload-list="upload"
          placeholder="jpg 또는 gif 확장자, 5MB 이하만 업로드 가능합니다. 등록된 이미지는 공지사항 상단에 노출됩니다." pause-button-shown
          @file-success="fileSuccess" />

        <!-- 파일 업로드 버튼 -->
        <Upload format="file" :upload-list="uploadfile"
          placeholder="jpg 또는 gif 확장자, 5MB 이하만 업로드 가능합니다. 등록된 이미지는 공지사항 상단에 노출됩니다." pause-button-shown
          @file-success="fileSuccess" />

        <!-- 파일 업로드 버튼 (readonly) -->
        <Upload format="file" :upload-list="uploadfile"
          placeholder="jpg 또는 gif 확장자, 5MB 이하만 업로드 가능합니다. 등록된 이미지는 공지사항 상단에 노출됩니다." pause-button-shown readonly
          @file-success="fileSuccess" />
        <hr>
        <!-- 이미지 업로드 버튼(default) -->
        <Upload format="img" :upload-list="upload" placeholder="5MB 이하만 업로드 가능합니다." progress-shown pause-button-shown
          @file-success="fileSuccess" />

        <!-- 이미지 업로드 버튼 -->
        <Upload format="img" :upload-list="uploadfile" placeholder="5MB 이하만 업로드 가능합니다." progress-shown
          pause-button-shown @file-success="fileSuccess" />

        <!-- 이미지 업로드 버튼(readonly) -->
        <Upload format="img" :upload-list="uploadfile" placeholder="5MB 이하만 업로드 가능합니다." progress-shown readonly
          pause-button-shown @file-success="fileSuccess" />
      </div>
    </div>
    <hr>
  </div>
</template>

<style lang="scss"></style>
