import React from "react";
import {NavLink} from "react-router-dom";
import {Navbar} from "react-materialize";
import {logout} from "../../helpers/auth"
import {NavItem} from "react-materialize";

const Nav = () =>
	<Navbar brand='Board Game' right>
		<li><NavLink to="/games">Your Games</NavLink></li>
		<li><NavLink to="/friends">Friends List</NavLink></li>
		<li><NavLink to="/news">News Feed</NavLink></li>
		<li><NavItem onClick={logout}>Log Out</NavItem></li>
	</Navbar>
export default Nav;
