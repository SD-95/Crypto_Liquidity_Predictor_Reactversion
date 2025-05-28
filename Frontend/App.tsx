import Navbar_content from './template/Navbar_content'
import Prediction_input from './template/Prediction_input'
import Footer from './template/Footer'
import React from 'react'
import './App.css'


const App = () => {
    return (
        <React.Fragment>
            <Navbar_content />
            <Prediction_input />
            <Footer />
        </React.Fragment>
    )
}

export default App
