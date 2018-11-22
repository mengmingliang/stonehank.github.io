import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as userConfig from './user-config'
import ProgressLoading from './ProgressWrapper/ProgressLoading'
import BookmarkProvider from "./tools/BookmarkProvider";


// const {registerObserver} = require('react-perf-devtool')
// // Simple, no?
// registerObserver({
//   port: 3000
// })

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

function InitialComponentHOC(LazyComponent){
  return class extends React.Component{
    componentDidMount(){
      document.body.removeChild(document.getElementById("initialLoading"))
    }
    render(){
      return <LazyComponent {...this.props}/>
    }
  }
}
const Initial=InitialComponentHOC(lazy(() => import("./ProgressWrapper/WrappedProgressApp")))

try{
  ReactDOM.render(
    <Suspense fallback={<ProgressLoading />}>
      <BookmarkProvider>
        <Initial userConfig={userConfig.default}/>
      </BookmarkProvider>
    </Suspense>
    , document.getElementById('root'));
}catch(err){
  alert('浏览器太旧啦！更新下吧~')
}