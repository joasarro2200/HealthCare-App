import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOME_ROUTE, LIST_PATIENTS_ROUTE } from './constants/routes';
import Home from './pages/Home';
import Header from './components/Header';
import ListPatients from './pages/ListPatients';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={LIST_PATIENTS_ROUTE} element={<ListPatients />} />
    </Routes>
  </BrowserRouter>
);

export default App;
