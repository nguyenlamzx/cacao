import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

document.onreadystatechange = function onreadystatechange() {
  const root = document.getElementById('root');
  if (!root) {
    throw Error('Can not found the root element!!!');
  }
  App.bootstrap(root);
};
registerServiceWorker();
