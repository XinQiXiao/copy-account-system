import React, { Component } from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

// components
import { UserInfoComponent } from './UserInfo'
import { LoginModal, LogupModal } from '../modal'

// style
import styles from './index.css'

// config
import { contantsConfig } from '../../config'

class SystemInfo extends Component{
	constructor(props){
		super(props)

		this.state = {
			isLogin: false,
			username: '',
			password: '',
			showLoginModal: false,
		}

		this._loginClick = this._loginClick.bind(this)
		this._logupClick = this._logupClick.bind(this)
		this._loginModalConfirm = this._loginModalConfirm.bind(this)
		this._loginModalCancel = this._loginModalCancel.bind(this)
		this._logupModalConfirm = this._logupModalConfirm.bind(this)
		this._logupModalCancel = this._logupModalCancel.bind(this)
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
			username: (info && info.username) ? info.username : '',
			password: (info && info.password) ? info.password : ''
		})
	}
	_loginModalCancel(){
		this.setState({
			showLoginModal: false
		})
	}

	_logupClick(){
		const { dispatch } = this.props
		dispatch({
			type: 'systemUser/logup'
		})
		browserHistory.push('/')
	}
	_logupModalConfirm(userData){
		const {dispatch} = this.props
		new Promise((resolve, reject)=>{
			dispatch({
				type: 'systemUser/doLogup',
				payload: {
					userData,
					resolve, 
					reject
				}
			})
		}).catch((e)=>{
			console.log('_logupModalConfirm e=>', e)
		})
	}
	_logupModalCancel(){
		const { dispatch } = this.props
		dispatch({
			type: 'systemUser/hideLogupModal'
		})
	}

	render(){
		const {isLogin, username, showLoginModal} = this.state
		const { logupModalVisible } = this.props.systemUser
		return (
			<div className={styles.systemInfo}>
				<span className={styles.systemName}>{contantsConfig.SYSTEM_NAME}</span>
				<UserInfoComponent isLogin={isLogin} username={username}
					showRegister={!isLogin ? true : false}
					loginClick={this._loginClick} logupClick={this._logupClick}
				/> 
				<LoginModal visible={showLoginModal} 
					onConfirm={this._loginModalConfirm} onCancel={this._loginModalCancel}
				/>
				<LogupModal visible={logupModalVisible}
					onConfirm={this._logupModalConfirm} onCancel={this._logupModalCancel}
				/>
			</div>
		)
	}
}

function mapStateToProps({systemUser}){
	return {systemUser}
}

export default connect(mapStateToProps)(SystemInfo)