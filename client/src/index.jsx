import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from './containers/AppContainer';

window.addEventListener('load', () => {
  ReactDOM.render(
    <AppContainer />,
    document.getElementById('app'),
  );
});
