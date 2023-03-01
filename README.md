<h1 align="center">Taro Plugin: Auto-Declare-Define-Constants</h1>
<p align="center">
  <a href='https://www.npmjs.com/package/taro-plugin-auto-declare-define-constants'><img src="https://img.shields.io/npm/v/taro-plugin-auto-declare-define-constants.svg" alt="Version"></a>
  <h5 align="center">用于Taro框架在<code>defineConstants</code>中的变量自动生成TS声明文件的一个插件 🔧 <h5>
</p>

## 你得先知道的  
`defineConstants`是用于配置一些全局变量供代码中进行使用 配置方式可参考 [Webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/)  

```javascript
// If the value is a string it will be used as a code fragment.
// If the value isn't a string, it will be stringified (including functions).
// If the value is an object all keys are defined the same way.
// If you prefix typeof to the key, it's only defined for typeof calls.

new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
});
```


## 食用方法 🔨
```shell
# 安装依赖

npm install -D taro-plugin-auto-declare-define-constants 

# or 

yarn add -D taro-plugin-auto-declare-define-constants
```  

```js
// config/index.js

const config = {
  //...
  plugins: [
    'taro-plugin-auto-declare-define-constants'
  ]
  //...
}
```  

```shell
# 最后将项目跑起来 看下项目根目录是否出现「defineConstants.d.ts」
npm run dev:weapp

# or

yarn dev:weapp
```  
![build.png](https://s2.loli.net/2024/07/29/qrpA7JaCtfgV9Qo.png)

## Tips 💡
1. 在设计此插件的过程中考虑到开发中经常会出现在`defineConstants`中未使用`JSON.stringify()` or `'"xxx"'`来定义字符串变量 故增加此提示供开发者自行检查（该key将被设置为`unknown`类型）
![warning.png](https://s2.loli.net/2023/02/22/RQzpsAiPuhmoSlt.png)
2. 如果插件未满足你想要的效果 欢迎提issues 会抽空查看的0.0 ~~（不好说）~~
