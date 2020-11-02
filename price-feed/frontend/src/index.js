import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Core   from './components/Core';
import config from './config.json';

ReactDOM.render(<Core config={config}/>, document.getElementById('root'));
