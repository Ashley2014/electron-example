const { exec } = require('child_process');
const { join } = require('path');

const projectFolder = join(__dirname, '../../../projects/');

module.exports = function({ name, url }) {
  return new Promise((resolve, reject) => {
    if (!url) {
      return reject('请输入项目仓库地址');
    }

    const command = `cd ${projectFolder} && git clone ${url} ${name}`;
    console.log('command', command);
    exec(command, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return reject(`克隆失败 ${err}`);
      }

      // the *entire* stdout and stderr (buffered)
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
      return resolve(`克隆失败成功`);
    });
  });
};
