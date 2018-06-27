
import React, { Component } from 'react'
import { connect } from 'dva'

// util
import { webSessionUtil } from '../../utils'

class ResourceContainer extends Component{

	UNSAFE_componentWillMount(){
		const { isLogin } = this.props
		if(!isLogin){
			webSessionUtil.redirect()
		}
	}

	render(){
		const { isLogin } = this.props
		if(!isLogin){
			return null
		}
		return (
			<div>
				Resource
			</div>
		)
	}
}

function mapStateToProps({systemUser}){
	return {
		isLogin: systemUser.isLogin
	}
}

export default connect(mapStateToProps)(ResourceContainer)