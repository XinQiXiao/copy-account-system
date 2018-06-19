/**
 * create at 06/19/18
 */
import React, { Component } from 'react'
import {Button, Avatar} from 'antd'

// style
import styles from './index.css'

class UserInfoComponent extends Component{
	render(){
		const {
			isLogin, userName, showRegister, loginClick, logupClick
		} = this.props
		return (
			<span className={styles.userInfo}>
				{showUserName(isLogin, userName)}
				<Button type='primary' className={styles.loginButton} onClick={loginClick}>
					{isLogin ? '退出' : '登录'}
				</Button>
				<RegisterButton registerClick={logupClick} isShow={showRegister}/>
			</span>
		)
	}
}

const showUserName = (isLogin, name) => {
	if(!isLogin){
		return null
	}
	return (
		<span className={styles.userName}>
			<span >
				<Avatar style={{marginRight: '4px'}} size='small' icon='user'/>{name}
			</span>
		</span>
	)
}

class RegisterButton extends Component{
	render(){
		const {isShow, registerClick} = this.props
		if(!isShow){
			return null
		}
		return(
			<Button className={styles.logupButton} onClick={registerClick}>注册</Button>
		)
	}
}

export {
	UserInfoComponent
}