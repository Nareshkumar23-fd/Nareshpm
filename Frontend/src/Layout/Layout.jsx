import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PortfolioPages from '../Router/PortfolioPages'

const Layout = () => {
    return (
        <>
            <NavBar />
            <PortfolioPages />
            <Footer />
        </>
    )
}

export default Layout