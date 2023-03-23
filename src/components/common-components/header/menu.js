import React from 'react';
import {Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink,} from 'reactstrap';
import {ACCOUNT_NAME, DEFAULT_WALLET, ROUTES} from '../../../global/constant';
import { createURL } from '../../../global/helper';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const url = createURL(ROUTES.CPU_RENTAL, { wallet:  ACCOUNT_NAME});
    return (
      <div>
        {/*<Navbar expand="md">*/}
        {/*  <NavbarToggler onClick={this.toggle} />*/}
        {/*  <Collapse isOpen={this.state.isOpen} navbar>*/}
        {/*    <Nav className="ml-auto" navbar>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink href="/">Home</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink href={url}>CPU-Rental</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      /!* <NavItem>*/}
        {/*        <NavLink href="/">Stanks</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink href="/">Resources</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink href="/">Play Stank City</NavLink>*/}
        {/*      </NavItem> *!/*/}
        {/*    </Nav>*/}
        {/*  </Collapse>*/}
        {/*</Navbar>*/}
      </div>
    );
  }
}