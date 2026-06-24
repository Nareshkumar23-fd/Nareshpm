import React from 'react'
import PortfolioPages from './Router/PortfolioPages'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <NavBar />
      <PortfolioPages />
      <Footer />
    </>
  )
}

export default App