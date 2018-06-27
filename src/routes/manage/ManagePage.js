import React, { Component } from 'react'
import { connect } from 'dva'

import { webSessionUtil } from '../../utils'

class ManagePage extends Component{
	UNSAFE_componentWillMount(){
		const {isLogin = false} = this.props
		console.log('ManagePage props===>', this.props)
		if(!isLogin){
			webSessionUtil.redirect()
		}
	}

	render(){
		const { children } = this.props
		return (
			<div >
				{children}
			</div>
		)
	}
}

function mapStateToProps({systemUser}){
	return {
		isLogin: systemUser.isLogin
	}
}

export default connect(mapStateToProps)(ManagePage)