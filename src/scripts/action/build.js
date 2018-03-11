const { exec } = require('child_process');

module.exports = function({ name, path: projectFolder }) {
  if (!projectFolder) {
    console.error('请传入编译的项目名');
    reutrn;
  }

  console.info(`开始编译 ${projectFolder}`);
  alert(`开始编译 ${name}`);
  const command = `cd ${projectFolder} && npm install && npm run build`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`编译失败 ${name}`);
      alert(`编译失败 ${name}`);
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    console.info(`编译成功 ${projectFolder}`);
    alert(`编译成功 ${name}`);
  });
};
