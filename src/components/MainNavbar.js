import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';



class MainNavbar extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/#/">HOA Systems</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/#/dashboard">Dashboard</Nav.Link>
                        {(this.props.activeUser.isCommitteeMember) ? 
                        <Nav.Link href="/#/tenants">Tenants</Nav.Link> : null}
                        <Nav.Link href="/#/messages">Messages</Nav.Link>
                        <Nav.Link href="/#/issues">Issues</Nav.Link>
                        <Nav.Link href="/#/voting">Voting</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/#/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MainNavbar;