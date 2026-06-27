import React from 'react'
import Layout from './Layout/Layout';
import PageRouter from './MyPanel/Router/PageRouter';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/admin/*" element={<PageRouter />} />
      </Routes>
    </>
  )
}

export default App