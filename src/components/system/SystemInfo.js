import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

// components
import { UserInfoComponent } from './UserInfo'
import { LoginModal } from '../modal'

// style
import styles from './index.css'

// config
import { contantsConfig } from '../../config'

class SystemInfo extends Component{
	constructor(props){
		super(props)

		this.state = {
			isLogin: false,
			userName: '',
			password: '',
			showLoginModal: false
		}

		this._loginClick = this._loginClick.bind(this)
		this._logupClick = this._logupClick.bind(this)
		this._loginModalConfirm = this._loginModalConfirm.bind(this)
		this._loginModalCancel = this._loginModalCancel.bind(this)
	}

	_loginClick(){
		const {isLogin} = this.state
		if(!isLogin){
			this.setState({
				showLoginModal: true,
			})
			return
		}
		this.setState({
			isLogin: false
		})
	}
	_loginModalConfirm(info){
		this.setState({
			isLogin: true,
			showLoginModal: false,
			userName: (info && info.userName) ? info.userName : '',
			password: (info && info.password) ? info.password : ''
		})
	}
	_loginModalCancel(){
		this.setState({
			showLoginModal: false
		})
	}

	_logupClick(){
		Modal.warning({
			title: '提示',
			content: <p style={{fontSize: 14}}>注册功能正在开发</p>
		})
	}

	render(){
		const {isLogin, userName, showLoginModal} = this.state
		return (
			<div className={styles.systemInfo}>
				<span className={styles.systemName}>{contantsConfig.SYSTEM_NAME}</span>
				<UserInfoComponent isLogin={isLogin} userName={userName}
					showRegister={!isLogin ? true : false}
					loginClick={this._loginClick} logupClick={this._logupClick}
				/> 
				<LoginModal visible={showLoginModal} 
					onConfirm={this._loginModalConfirm} onCancel={this._loginModalCancel}
				/>
			</div>
		)
	}
}

export default connect()(SystemInfo)