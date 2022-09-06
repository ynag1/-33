// 所有push的插件的都是一个函数
const bxToRem = require('postcss-pxtorem')
module.exports = {
  // 插件
  plugins: [
    bxToRem({
      // 根节点的字体大小
			// 如果vant是37.5 如果组件==自己的代码75
			// file 当前编译的css的文件路径
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] // 所有属性都转成rem
    })
  ]
}
