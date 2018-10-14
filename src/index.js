import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import BlogLayout from "./BlogLayout";

import * as userConfig from './user-config'
import './css/index.css';
import './css/github.min.css'


const {registerObserver} = require('react-perf-devtool')
// Simple, no?
registerObserver({
  port: 3000
})

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

ReactDOM.render(<BlogLayout userConfig={userConfig}/>, document.getElementById('root'));
registerServiceWorker();
