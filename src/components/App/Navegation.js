import React from 'react';
import './style.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom'

export default class NavTool extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
        collapsed: true
      };
    }
  
    toggleNavbar() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
    render() {
      return (
        <div>
          <Navbar color="faded" light className="navbar-custom">
          
            <NavbarBrand className="mr-auto">MENU</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" id="boton1"/>
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="mr-auto"><Link to="/">Home</Link></NavLink>
                  
                </NavItem>
                <NavItem>
                  <NavLink className="mr-auto"><Link to="/accounts">Accounts</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="mr-auto"><Link to="/transfers">Transfers</Link></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <hr/>
        </div>
      );
    }
  }