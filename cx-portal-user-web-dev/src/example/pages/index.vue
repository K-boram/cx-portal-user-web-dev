<script lang="ts" setup>
const router = useRouter()

const uiComponentData = reactive<any[]>([
  {
    name: 'icon-list',
    desc: '모든 아이콘 파일',
  },
  {
    name: 'button',
    desc: '기본 / 파일 버튼',
  },
  {
    name: 'dropdown',
    desc: '기본 / 검색 드롭다운',
  },
  {
    name: 'input',
    desc: '기본 / 넘버 / 검색 인풋',
  },
  {
    name: 'switch',
    desc: '스위치 토글 버튼',
  },
  {
    name: 'datepicker',
    desc: '기본 / 레인지 데이트피커',
  },
  {
    name: 'checkbox',
    desc: '체크박스(다중 선택)',
  },
  {
    name: 'radio',
    desc: '라디오 (단일 선택)',
  },
  {
    name: 'form',
    desc: '필드 형태 UI',
  },
  {
    name: 'tabs',
    desc: '탭 (화면 전환)',
  },
  {
    name: 'title',
    desc: '화면 타이틀',
  },
  {
    name: 'modal',
    desc: '기본 / 컨펌 / 얼럿 / 토스트 모달 팝업',
  },
  {
    name: 'box',
    desc: '컨텐츠를 감싸는 박스 UI',
  },
  {
    name: 'carousel',
    desc: '캐러셀(스와이퍼) / 인디케이터',
  },
  {
    name: 'g-c-area',
    desc: '그래프/차트 영역표시용 엑박 UI',
  },
  {
    name: 'table',
    desc: '테이블',
  },
  {
    name: 'pagination',
    desc: '페이지네이션',
  },
  {
    name: 'tooltip',
    desc: '툴팁',
  },
  {
    name: 'divider',
    desc: '구분선',
  },
  {
    name: 'slider',
    desc: '슬라이더',
  },
  {
    name: 'progress',
    desc: '프로그레스바',
  },
  {
    name: 'tree',
    desc: '트리',
  },
  {
    name: 'filter',
    desc: '우측 필터 사이드바',
  },
  {
    name: 'tag',
    desc: '태그',
  },
])

const movePage = (target: any) => {
  router.push(`/example/${target.name}`)
}
</script>

<template>
  <div class="p-20 examples">
    <h1 class="mb-10 text-3xl font-semibold">
      UI Example
    </h1>

    <el-table :data="uiComponentData" row-class-name="cursor-pointer capitalize" @row-click="movePage">
      <el-table-column type="index" width="'5%'" />
      <el-table-column property="name" label="Name" width="'20%'" />
      <el-table-column property="desc" label="Description" width="'75%'" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: ui-examples
meta:
  isPublicPath: true
</route>
