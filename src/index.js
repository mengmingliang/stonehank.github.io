import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Entry from './Entry';
import registerServiceWorker from './registerServiceWorker';



var {registerObserver} = require('react-perf-devtool')

// Simple, no?
registerObserver({
  port: 3000
})

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

ReactDOM.render(<Entry />, document.getElementById('root'));
registerServiceWorker();
