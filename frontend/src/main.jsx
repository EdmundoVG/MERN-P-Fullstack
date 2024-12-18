import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ProductList from './screens/ProductList.jsx';
import CreateProduct from './screens/CreateProduct.jsx';
import EditProduct from './screens/EditProduct.jsx';

import '@fortawesome/fontawesome-free/css/all.min.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />}/>
      <Route path='/login' element={<LoginScreen />}/>
      <Route path='/register' element={<RegisterScreen />}/>

      {/*Rutas Privadas*/}
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfileScreen />}/>
        <Route path='/products' element={<ProductList />}/>
        <Route path='/product/create' element={<CreateProduct />}/>
        <Route path='/product/:id/edit' element={<EditProduct />}/> 
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

