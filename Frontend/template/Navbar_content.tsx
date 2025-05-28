import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Navbar_content = () => {
    return (
        <React.Fragment>
            <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Crypto-Currency Predictor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <!-- Hero Section --> */}
            <section className="hero">
                <div className="container">
                    <h1>Predict Liquidity & Make Smart Decisions</h1>
                    <p className="lead">Input coin metrics to check liquidity risk and investment advice.</p>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Navbar_content
