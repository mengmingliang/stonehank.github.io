import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as userConfig from './user-config'
import ProgressLoading from './ProgressWrapper/ProgressLoading'


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

ReactDOM.render(
  <Suspense fallback={<ProgressLoading />}>
    <Initial userConfig={userConfig.default}/>
  </Suspense>
  , document.getElementById('root'));