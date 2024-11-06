const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

function generateCustomApi() {
  // TODO: swagger 공유되면 swagger path 수정
    const inputUrl = process.argv[2] || 'https://acf.abacussw.co.kr/acf/api/api-docs';
    const outputDir = process.argv[3] || path.join(__dirname, 'api');
    const backupDir = path.join(__dirname, 'api_backup'); 
    const command = `swagger-typescript-api -p ${inputUrl} -o ${outputDir} --axios --modular`;

    fs.emptyDirSync(backupDir); 
    fs.copySync(outputDir, backupDir);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        console.log(`stdout: ${stdout}`);
        console.log('API 코드 생성 완료!');

        const existingFiles = fs.readdirSync(backupDir).filter(file => file.endsWith('.ts'));

        const newFiles = fs.readdirSync(outputDir).filter(file => file.endsWith('.ts'));

        newFiles.forEach(file => {
            const newFilePath = path.join(outputDir, file);
            const existingFilePath = path.join(backupDir, file);

            if (existingFiles.includes(file)) {
                const existingFileContent = fs.readFileSync(existingFilePath, 'utf8');
                const newFileContent = fs.readFileSync(newFilePath, 'utf8');

                if (existingFileContent !== newFileContent) {
                    console.log(`${file} has changed.`);
                }
            } else {
                console.log(`${file} is a new file.`);
            }
        });
    });
}

// 함수 실행
generateCustomApi();
