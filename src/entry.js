const { join } = require('path');
const fs = require('fs');

const Vue = require('vue/dist/vue.common');
Vue.config.productionTip = false;

const projectFolder = join(__dirname, '../projects/');

const buildAction = require('./scripts/action/build');
const cloneAction = require('./scripts/git/clone');

const app = new Vue({
  el: '#app',
  data: {
    versions: [
      {
        name: 'Node.js',
        version: process.versions.node,
      },
      {
        name: 'Chromium',
        version: process.versions.chrome,
      },
      {
        name: 'Electron',
        version: process.versions.electron,
      },
    ],
    // 项目列表
    projects: [
      // {
      //   name: '',
      //   path: '',
      // },
    ],
    formData: {
      projectName: '',
      gitUrl: '',
    },
  },
  methods: {
    initProject() {
      this.projects = [];
      fs.readdirSync(projectFolder).forEach(file => {
        const filePath = join(projectFolder, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        if (isDirectory) {
          const project = {
            name: file,
            path: filePath,
          };
          this.projects.push(project);
        }
      });
    },
    async addProject() {
      const { projectName, gitUrl } = this.formData;
      if (!gitUrl) {
        return;
      }
      await cloneAction({
        name: projectName,
        url: gitUrl,
      });
      this.formData.projectName = '';
      this.formData.gitUrl = '';
      this.initProject();
    },
    build(project) {
      buildAction(project);
    },
    preview(project) {
      alert('推送到测试服务器, 开发中');
      // preview(project)
    },
    release(project) {
      alert('推送到正式服务器, 开发中');
      // release(project)
    },
    remove({ path }) {
      alert('开发中');
      // fs.unlinkSync(path);
      // this.initProject();
    },
  },
  template: `<div>
  <p>正在使用:</p>
  <p v-for="item in versions">{{item.name}} {{item.version}}</p>

  <h3>项目列表:</h3>
  <div>添加新项目:
  <input placeholder="项目名称, 默认仓库名称" v-model="formData.projectName" type="text"/>
  <input placeholder="项目地址" v-model="formData.gitUrl" type="text"/>
  <button @click="addProject">添加</button></div>
  <p v-for="project in projects">
  {{project.name}}
  <button @click="build(project)" >编译</button>
  <button @click="preview(project)" >预览</button>
  <button @click="release(project)" >发布</button>
  <button @click="remove(project)" >删除</button>
  </p>

  </div>`,
  mounted() {
    this.initProject();
  },
});
