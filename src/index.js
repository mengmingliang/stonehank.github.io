import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Entry from './Entry';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Entry />, document.getElementById('root'));
registerServiceWorker();
