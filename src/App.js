import { BrowserRouter, Route } from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './App.css';
import  './styles/mainStyles.css'
import Navigation from './Navigation/navigation';
import reducer from './redux/Reducers';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
