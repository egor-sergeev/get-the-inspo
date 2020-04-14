import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


let appObject = ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister();

export default appObject;
