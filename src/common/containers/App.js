import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import DevTool from './DevTools';

export default class App extends Component {
  renderDevTool() {
    return process.env.NODE_ENV === 'production' ? null : <DevTool />;
  }
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">II2D</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <li><Link to="/">Home</Link></li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
}
