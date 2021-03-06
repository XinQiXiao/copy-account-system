import React, { Component } from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import { Modal } from 'antd'
import _ from 'lodash'

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

		this._loginClick = this._loginClick.bind(this)
		this._logupClick = this._logupClick.bind(this)
		this._loginModalConfirm = this._loginModalConfirm.bind(this)
		this._loginModalCancel = this._loginModalCancel.bind(this)
		this._logupModalConfirm = this._logupModalConfirm.bind(this)
		this._logupModalCancel = this._logupModalCancel.bind(this)
	}

	_loginClick(){
		const { dispatch, isLogin } = this.props
		dispatch({
			type: isLogin ? 'systemUser/doLogout' : 'systemUser/login'
		})
		console.log('_loginClick isLogin==>', isLogin)
		browserHistory.push('/')
	}
	_loginModalConfirm(userData){
		const { dispatch } = this.props
		new Promise((resolve, reject)=>{
			dispatch({
				type: 'systemUser/doLogin',
				payload: {userData, resolve, reject}
			})
		}).catch(e=>{
			if(e && e.code === 1){
				Modal.error({
					title: '提示',
					content: <p style={{fontSize: 14}}>该用户不存在！</p>
				})
			} 
			if(e && e.code === 2){
				Modal.error({
					title: '提示',
					content: <p style={{fontSize: 14}}>密码错误！</p>
				})
			}
		})
	}
	_loginModalCancel(){
		const { dispatch } = this.props
		dispatch({
			type: 'systemUser/hideLoginModal'
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
					userData, resolve, reject
				}
			})
		}).catch((e)=>{
			if(!_.isNil(e) && e.code === 3){
				Modal.error({
					title: '提示',
					content: <p style={{fontSize: 14}}>该用户已存在！</p>
				})
			}
		})
	}
	_logupModalCancel(){
		const { dispatch } = this.props
		dispatch({
			type: 'systemUser/hideLogupModal'
		})
	}

	render(){
		const { loginModalVisible, logupModalVisible, isLogin, username } = this.props
		return (
			<div className={styles.systemInfo}>
				<span className={styles.systemName}>{contantsConfig.SYSTEM_NAME}</span>
				<UserInfoComponent isLogin={isLogin} username={username}
					showRegister={!isLogin ? true : false}
					loginClick={this._loginClick} logupClick={this._logupClick}
				/> 
				<LoginModal visible={loginModalVisible} 
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
	return {
		isLogin: systemUser.isLogin,
		username: systemUser.username,
		loginModalVisible: systemUser.loginModalVisible,
		logupModalVisible: systemUser.logupModalVisible,
	}
}

export default connect(mapStateToProps)(SystemInfo)