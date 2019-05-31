// const hljs=require('highlight.js/lib/highlight')
// hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
const path=require("path")
// const webpack = require('webpack');
// const { injectBabelPlugin } = require('react-app-rewired');
// const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')

const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addBundleVisualizer
} = require("customize-cra");


module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  }),
  addWebpackAlias({
    ['@ant-design/icons/lib/dist$']:path.resolve(__dirname, './src/icons.js')
  }),
  // addBundleVisualizer({
  //   "analyzerMode": "static",
  //   "reportFilename": "report.html"
  // })
);


// module.exports = function override(config, env) {
//   // antd Icon的临时解决方案
//   // https://github.com/ant-design/ant-design/issues/12011#issuecomment-420038579
//   // config.resolve.alias['@ant-design/icons/lib/dist$']=path.resolve(__dirname, './src/icons.js')
//   // config = injectBabelPlugin(
//   //   ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
//   //   config,
//   // );
//
//   // 添加mrakdown-loader
//   // const marked = require("marked");
//   // const renderer = new marked.Renderer();
//   // let mdLoader={
//   //   test: /\.md$/,
//   //   use: [
//   //     { loader: "html-loader"},
//   //     { loader: "markdown-loader",
//   //       options: {
//   //         renderer,
//   //         highlight: function (str, lang) {
//   //           if (lang && hljs.getLanguage(lang)) {
//   //             try {
//   //               return '<pre class="hljs"><code>' +
//   //                 hljs.highlight(lang, str, true).value +
//   //                 '</code></pre>';
//   //             } catch (__) {}
//   //           }
//   //
//   //           return '<pre class="hljs"><code>' + str + '</code></pre>';
//   //         }
//   //       }
//   //     }
//   //   ]
//   // }
//   // let rules=config.module.rules
//   // let oneOf=rules[rules.length-1]["oneOf"]
//   // oneOf.splice(oneOf.length-1,0,mdLoader)
//
//
//   // bunlde-analyzer分析
//   if (env === 'production') {
//     config = rewireWebpackBundleAnalyzer(config, env, {
//       analyzerMode: 'static',
//       reportFilename: 'report.html'
//     })
//   }
//
//   // if(env==="production"){
//   //   config.plugins.push(
//   //     new webpack.NamedChunksPlugin((chunk) => {
//   //       if (chunk.name) {
//   //         return chunk.name;
//   //       }
//   //       return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
//   //     })
//   //   )
//   // }
//   if(env==="production"){
//     // config.output.path="D:\\Project\\github\\stonehank.github.io"
//     config.output.chunkFilename='static/js/[name].chunk.js'
//   }
//
//   // console.log(config)
//   return config;
// };