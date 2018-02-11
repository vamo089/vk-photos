import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import data from './data/data';

ReactDOM.render(

    <App imageitems={data} />
  ,
  document.getElementById('root')
);
// ReactDOM.render(<AppContainer initialData={'data'} title='hello test'/>, document.getElementById('root'));

// Hot Module Replacement API

