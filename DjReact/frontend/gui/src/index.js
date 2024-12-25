import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';  // Sử dụng named import
import reducer from './store/reducers/auth';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Tạo Redux store sử dụng configureStore
const store = configureStore({
  reducer, // Đặt reducer chính
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Thêm redux-thunk vào middleware
  devTools: process.env.NODE_ENV !== 'production', // Chỉ bật Redux DevTools trong môi trường phát triển
});

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));