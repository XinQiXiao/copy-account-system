import React from 'react'
import { Link } from 'dva/router'

// style
import styles from './index.css'

const NavLink = ({target, linkText}) => (
	<Link to={target} className={styles.link}>{linkText}</Link>
)

export default NavLink