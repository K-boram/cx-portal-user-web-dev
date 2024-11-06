# upload 사용방법

필요한 값을 props로 보내주면 됩니다.
  
## Attributes

#### uploadURL=""
    설    명 : 서버에 업로드 할 URL
    타    입 : string
    기 본 값 : '/upload'

#### progress-shown
    설    명 : progress bar를 나타냅니다.
    타    입 : boolean
    기 본 값 : false

#### pause-button-shown
    설    명 : 업로드 일시정지/재생 버튼을 나타냅니다.
    타    입 : boolean
    기 본 값 : false

#### progress-color=""
    설    명 : progress bar의 색상을 지정합니다.
    타    입 : string
    기 본 값 : '#1989fa'

#### success-color=""
    설    명 : 업로드 성공 시 progress bar의 색상을 지정합니다.
    타    입 : string
    기 본 값 : '#5cb87a'

### error-color=""
    설    명 : 업로드 실패 시 progress bar의 색상을 지정합니다.
    타    입 : string
    기 본 값 : '#f56c6c'

<br>

## Event

#### @pause
    설    명 : 업로드 일시정지 시 실행되는 이벤트

    ex) const pauseUploadFile = () => console.log('pause')

#### @reUpload
    설    명 : 업로드 일시정지 후 업로드 재시작 시 실행되는 이벤트

    ex) const reUploadFile = () => console.log('reUpload') 

#### @remove
    설    명 : 업로드 된 파일 삭제 시 실행되는 이벤트

    ex) const removeUploadFile = (files: Resumable.ResumableFile[]) => console.log(files) 

#### @fileAdded
    설    명 : 파일 업로드 추가 시 실행되는 이벤트

    ex) const addUploadFile = (files: Resumable.ResumableFile[]) => console.log(files) 

#### @fileProgress
    설    명 : 파일 업로드 진행 중에 실행되는 이벤트

    ex) const progressUploadFile = (files: Resumable.ResumableFile[]) => console.log(files) 

#### @fileSuccess
    설    명 : 파일 업로드 성공 시 실행되는 이벤트

    ex) const successUploadFile = (files: Resumable.ResumableFile[], reponse: string) => {
          console.log(files)
          console.log(response)
        } 

#### @fileError
    설    명 : 파일 업로드 실패 시 실행되는 이벤트

    ex) const errorUploadFile = (files: Resumable.ResumableFile[], reponse: string) => {
          console.log(files)
          console.log(response)
        } 

    
