import React from "react";
import {Navbar, NavItem} from "react-materialize"

const Nav = () =>
	<Navbar brand='Board Game' right>
		<NavItem href='get-started.html'>Your Games</NavItem>
		<NavItem href='components.html'>Add New Game</NavItem>
		<NavItem href='components.html'>Play game</NavItem>
	</Navbar>
export default Nav;
