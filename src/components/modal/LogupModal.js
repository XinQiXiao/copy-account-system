/**
 * create at 06/20/18
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14}
}

class LogupModal extends Component{
	constructor(props){
		super(props)

		this._handleConfirm = this._handleConfirm.bind(this)
		this._handleKeyDown = this._handleKeyDown.bind(this)
		this._checkPass = this._checkPass.bind(this)
		this._checkConfirmPass = this._checkConfirmPass.bind(this)
	}

	_handleConfirm(){
		const {onConfirm} = this.props
		const {validateFields, getFieldsValue} = this.props.form
		if(_.isFunction(onConfirm)){
			validateFields((errors)=>{
				if(!!errors)
					return
				let userData = {...getFieldsValue()}
				onConfirm(userData)
			})
		}	
	}

	_handleKeyDown(e){
		if(e.keyCode === 13){
			this._handleConfirm()
		}
	}

	_checkPass(rule, value, callback){
		if(value){
			if(value.length < 6){
				return callback('密码长度不能小于6位！')
			}
			if(!/^([\d]+[a-zA-Z]+)|([a-zA-Z]+[\d]+)$/.test(value)){
				return callback('密码必须由数字和字母组成！')
			}
			callback()
		} else {
			callback()
		}
	}

	_checkConfirmPass(rule, value, callback){
		const {getFieldsValue} = this.props.form
		const {password = ''} = getFieldsValue()
		if(value && value !== password){
			return callback('确认两次输入密码一致！')
		}
		callback()
	}

	render(){
		const {visible, onCancel} = this.props
		const {getFieldDecorator} = this.props.form
		return (
			<Modal title='系统用户注册' visible={visible} onOk={this._handleConfirm}
				onCancel={onCancel}
			>
				<Form layout='horizontal'>
					<FormItem label='用户名：' hasFeedback {...formItemLayout}>
						{
							getFieldDecorator('username', {
								rules: [
									{
										required: true,
										message: '请输入用户名！'
									}
								]
							})(
								<Input type='text' onKeyDown={this._handleKeyDown}/>
							)
						}
					</FormItem>
					<FormItem label='密码：' hasFeedback {...formItemLayout}>
						{
							getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: '请输入密码！'
									},
									{
										validator: this._checkPass
									}
								]
							})(
								<Input type='password' onKeyDown={this._handleKeyDown}/>
							)
						}
					</FormItem>
					<FormItem label='确认密码：' hasFeedback {...formItemLayout}>
						{
							getFieldDecorator('confirmPassword', {
								rules: [
									{
										required: true,
										message: '请重新输入密码！'
									},
									{
										validator: this._checkConfirmPass
									}
								]
							})(
								<Input type='password' onKeyDown={this._handleKeyDown}/>
							)
						}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

LogupModal.propTypes = {
	visible: PropTypes.bool,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	form: PropTypes.object.isRequired,
}

export default Form.create()(LogupModal)