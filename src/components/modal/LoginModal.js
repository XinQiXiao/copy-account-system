/**
 * create at 06/19/18
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

class LoginModal extends Component{
	constructor(props){
		super(props)

		this._handleConfirm = this._handleConfirm.bind(this)
		this._handleCancel = this._handleCancel.bind(this)
		this._handleKeyDown = this._handleKeyDown.bind(this)
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

	_handleCancel(){
		const { onCancel } = this.props
		if(_.isFunction(onCancel)){
			onCancel()
		}	
	}

	_handleKeyDown(e){
		if(e.keyCode === 13){
			this._handleConfirm()
		}
	}

	render(){
		const {visible} = this.props
		const {getFieldDecorator} = this.props.form
		return (
			<Modal title='系统用户登录' visible={visible} onOk={this._handleConfirm}
				onCancel={this._handleCancel}
			>
				<Form layout='horizontal'>
					<FormItem label='用户名：' hasFeedback {...formItemLayout}>
						{
							getFieldDecorator('userName', {
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

LoginModal.propTypes = {
	visible: PropTypes.bool,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	form: PropTypes.object.isRequired,
}

export default Form.create()(LoginModal)