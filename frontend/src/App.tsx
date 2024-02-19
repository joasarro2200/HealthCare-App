import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CREATE_PATIENTS_ROUTE, HOME_ROUTE, LIST_PATIENTS_ROUTE } from './constants/routes';
import Home from './pages/Home';
import Header from './components/Header';
import ListPatients from './pages/ListPatients';
import CreatePatient from './pages/CreatePatient';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={LIST_PATIENTS_ROUTE} element={<ListPatients />} />
      <Route path={CREATE_PATIENTS_ROUTE} element={<CreatePatient />} />
    </Routes>
  </BrowserRouter>
);

export default App;
