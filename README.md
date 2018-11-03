### 项目结构
├── config             // 配置环境，接口
│   ├── index.js       // (变量develop - 用于环境配置 false-发布环境 true-开发环境输出：apiDomain - 域名配置，api - 统一存放接口)
├── components         // 公共组件
├── pages              // 页面
├── app.js             // 全局方法
├── static             // 静态文件
│   ├── css            // 公共css
│   └── icons          // 图标
└── utils              // 公共方法 / 插件 等
    ├── global.js      // 全局定义，配置域名(变量develop - 用于环境配置 false-发布环境 true-开发环境)
    ├── util.js        // 公共方法(封装常用方法引入文件后使用方法：如：util.formatDate.format(new Date(), 'yyyy-MM'))
    └── ec-canvas.js   // 图表插件

###app.js
封装网络请求，常用api
获取app实例：const APP = getApp();
APP.request(url, data).then((res) => {
    // 执行操作
});
