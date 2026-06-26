import React from 'react'
import Home from "../pages/Home";
import Skill from "../pages/Skill";
import AOI from "../pages/AOI";
import Education from "../pages/Education";
import ContactMe from "../pages/ContactMe";
import Projects from "../pages/Projects";
import InternShips from '../pages/InternShips';

const PortfolioPages = () => {
    return (
        <>
            <Home />
            <Skill />
            <Projects />
            <Education />
            <InternShips />
            <AOI />
            <ContactMe />

            
        </>
    )
}

export default PortfolioPages