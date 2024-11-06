<script setup lang="ts">
import type { IOptions } from '~/types/custom-dropdown'
import buttonExample from '~/example/pages/button.vue'
import formExample from '~/example/pages/form.vue'
import html2canvas from 'html2canvas';
import exceljs from "exceljs";
import * as rasterizeHTML from 'rasterizehtml';

const title = ref<string>('Main Title')

const viewDate = ref<string>('xx월 xx일 ~ xx일')

// 옵션 목록
const options = ref<IOptions[]>([
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
]);

const getList = (rowCount: string) => {
  console.log('rowCount>>>', rowCount)
}

const selectedAreas = ref(['buttonExampleRef', 'formExampleRef'])

// const buttonExampleRef = ref(null)
// const formExampleRef = ref(null)

const areaRefs = reactive({
  buttonExampleRef: null,
  formExampleRef: null
})

const areaToRefs = toRefs(areaRefs)
const hiddenContainer = ref(null)

// const exportExcel = async() => {
//   try {

//   } catch (error) {
//     console.error(error)
//   }
// }

// const dataUrlToBuffer = (dataUrl: string) => {
//   console.log('dataUrl>>>>>>', dataUrl);

//   // data:image/svg+xml;base64,.... 형식에서 Base64 데이터를 추출
//   // const base64String = dataUrl.split(',')[1];
//   // 디코딩
//   const svgDecoded = decodeURIComponent(dataUrl.split(',')[1]);
//   console.log('디코딩>>>>>>', svgDecoded);

//   // Base64 데이터를 Buffer로 변환
//   return Buffer.from(svgDecoded);
// }

const downloadFile = async () => {

  let worksheetData = []
  for (let area of selectedAreas.value) {
    const componentRef = areaToRefs[area].value;

    if (componentRef) {
      // html2canvas 사용하는 경우
      const canvas = await html2canvas(componentRef!.$el as HTMLElement);
      const imgData = canvas.toDataURL('image/png');
      // 캡쳐한 이미지 데이터를 사용 (예: 다운로드, 미리보기 등)
      console.log(`Captured ${area}:`, imgData);

      worksheetData.push(imgData)
      // rasterizeHTML 사용하는 경우
      //   rasterizeHTML.drawHTML(componentRef!.$el).then(function (renderResult) {
      //     // context.drawImage(renderResult.image, 10, 25);
      //     console.log('캡쳐한 이미지>>>>>>', renderResult.image.toDataURL('image/png')));

      //   worksheetData.push(renderResult.image)
      // });

    }
  }

  // excel 파일 생성
  const workbook = new exceljs.Workbook()

  const worksheet = workbook.addWorksheet('test')

  for (let i = 0; i < worksheetData.length; i++) {
    const imgId = workbook.addImage({
      base64: worksheetData[i],
      extension: 'png'
    })

    // worksheet.addBackgroundImage(imgId);
    worksheet.addImage(imgId, 'B2:N30');
    // worksheet.addImage(imgId, { tl: { col: 5 - 1, row: 5 - 0.5 }, ext: { height: 600, width: 600 } }); // tl 안에 col, row 로 위치를 정해줌
  }


  workbook.xlsx.writeBuffer().then((b) => {
    let a = new Blob([b]);
    let url = window.URL.createObjectURL(a);

    let elem = document.createElement("a");
    elem.href = url;
    elem.download = `${new Date().toString().replaceAll(" ", "")}.xlsx`;
    document.body.appendChild(elem);
    elem.style = "display: none";
    elem.click();
    elem.remove();
  });

  return workbook;
}

</script>

<template>
  <div class="w-full">
    <title-header :title="title" :view-date="viewDate" :use-row-count="true" :use-file-download="true"
      :row-count-options="options" @change-row-count="getList" @click-file-download="downloadFile" />

    <div ref="hiddenContainer">
      <!-- <buttonExample v-if="selectedAreas.includes('buttonExampleRef')" ref="buttonExampleRef" />
      <formExample v-if="selectedAreas.includes('formExampleRef')" ref="formExa" /> -->
      <component v-if="selectedAreas.includes('buttonExampleRef')" :is="buttonExample"
        :ref="areaToRefs.buttonExampleRef" />
      <component v-if="selectedAreas.includes('formExampleRef')" :is="formExample" :ref="areaToRefs.formExampleRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>