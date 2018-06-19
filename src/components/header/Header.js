import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

// style
import styles from './index.css'

// const
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const manageChildMenus = [
	{key: 'customer', path: '/customer', text: '客户', icon: 'user'},
	{key: 'product', path: '/customer', text: '商品', icon: 'inbox'},
	{key: 'supplier', path: '/customer', text: '供应商', icon: 'team'}
]
const billChildMenus = [
	{key: 'customerBill', path: '/customer', text: '客户对账', icon: 'user-add'},
	{key: 'supplier', path: '/customer', text: '供应商对账', icon: 'usergroup-add'},
]
const menus = [
	{key: 'index', path: '/', text: '首页', icon: 'home'},
	{key: 'order', path: '/customer', text: '订单', icon: 'solution'},
	{key: 'storage', path: '/customer', text: '入库', icon: 'upload'},
	{key: 'resource', path: '/customer', text: '物资', icon: 'pay-circle-o'},
	{key: 'settlement', path: '/customer', text: '结算', icon: 'pushpin-o'},
	{
		key: 'bill', path: '/bill', text: '对账', icon: 'copy',
		hasChildren: true, childrenData: billChildMenus
	},
	{
		key: 'manage', path: '/manage', text: '管理', icon: 'setting', 
		hasChildren: true, childrenData: manageChildMenus
	},
]

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
					{
						menus.map(({key, path, text, icon, hasChildren = false, childrenData = []}, index)=>{
							if(hasChildren){
								return (
									<SubMenu key={key} title={<SubTitle type={icon} text={text}/>}>
										{
											childrenData.map(({key, path, text, icon}, index)=>{
												return (
													<MenuItem key={key}>
														<NavLink target={path} linkText={<SubTitle type={icon} text={text}/>}/>
													</MenuItem>
												)
											})
										}
									</SubMenu>
								)
							}
							return (
								<MenuItem key={key}>
									<NavLink target={path} linkText={<SubTitle type={icon} text={text}/>}/>
								</MenuItem>
							)
						})
					}
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