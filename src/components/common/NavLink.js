import React from 'react'
import { Link } from 'dva/router'

const NavLink = ({target, linkText}) => (
	<Link to={target}>{linkText}</Link>
)

export default NavLink