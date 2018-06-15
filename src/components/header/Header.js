import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

// style
import styles from './index.css'

// const
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

class Header extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className={styles.header}>
				<Menu defaultSelectedKeys={['index']}
					mode='inline' theme='dark' className={styles.menuList}
				>
					<MenuItem >
						<NavLink target={'/'} linkText={<SubTitle type='home' text='首页'/>}/>
					</MenuItem>
					<SubMenu title={<SubTitle type='setting' text='管理'/>}>
						<MenuItem >
							<NavLink target={'/customer'} linkText={<SubTitle type='user-add' text='客户'/>}/>
						</MenuItem>
					</SubMenu>
					<MenuItem >
						<NavLink target={'/customer'} linkText={<SubTitle type='user-add' text='客户'/>}/>
					</MenuItem>
				</Menu>
			</div>
		)
	}
}

class SubTitle extends Component{
	render(){
		const {type = '', text = ''} = this.props
		return (
			<span>
				<Icon type={type}/>
				<span>{text}</span>
			</span>
		)
	}
}

const NavLink = ({target, linkText}) => (
	<Link to={target} className={styles.link}>{linkText}</Link>
)

export default Header