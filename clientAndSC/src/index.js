import React from 'react';import ReactDOM from 'react-dom/client';
import App from "./App";
import Header from "./Header";
import MyNfts from "./MyNfts";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import { isConnectedReducer } from './metamaskReducer';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    isConnected: isConnectedReducer
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Provider store={store}>
        <Header/>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/mynfts' element={<MyNfts/>}/>
        </Routes>
      </Provider>
    </Router>
    );


