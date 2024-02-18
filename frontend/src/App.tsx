import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOME_ROUTE } from './constants/routes';
import ListPatients from './pages/ListPatients/ListPatients';
import Header from './components/Header';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={HOME_ROUTE} element={<ListPatients />} />
    </Routes>
  </BrowserRouter>
);

export default App;
