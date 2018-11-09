import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';

// import BlogLayout from "./BlogLayout";

import * as userConfig from './user-config'


import Loading from "./tools/Loading";


function InitialComponentHOC(LazyComponent){
  return class extends React.Component{
    componentDidMount(){
      document.body.removeChild(document.getElementById("loading"))
    }
    render(){
      return <LazyComponent {...this.props}/>
    }
  }
}

const Initial=InitialComponentHOC(lazy(() => import('./BlogLayout')))
// const {registerObserver} = require('react-perf-devtool')
// // Simple, no?
// registerObserver({
//   port: 3000
// })

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const InitialLoading=function(){
  return <Loading loading={true} render_nums={3}
                  ske_title_width={`${20+Math.floor(Math.random()*10)}%`}
                  ske_para_width={`${50+Math.floor(Math.random()*30)}%`} ske_para_rows={3} />
}

ReactDOM.render(
  <Suspense fallback={<InitialLoading />}>
    <Initial userConfig={userConfig.default}/>
  </Suspense>
  , document.getElementById('root'));