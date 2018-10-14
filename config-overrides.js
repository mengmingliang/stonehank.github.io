const { injectBabelPlugin } = require('react-app-rewired');
// const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')
const path=require("path")

module.exports = function override(config, env) {
  // antd Icon的临时解决方案
  // https://github.com/ant-design/ant-design/issues/12011#issuecomment-420038579
  config.resolve.alias['@ant-design/icons/lib/dist$']=path.resolve(__dirname, './src/icons.js')
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config,
  );
  // if (env === 'production') {
  //   config = rewireWebpackBundleAnalyzer(config, env, {
  //     analyzerMode: 'static',
  //     reportFilename: 'report.html'
  //   })
  // }
  return config;
};