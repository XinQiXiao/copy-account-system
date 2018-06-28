
import React, { Component } from 'react'
import { connect } from 'dva'

// components
import { BreadcrumbList } from '../../components'

// util
import { webSessionUtil } from '../../utils'

// style
import styles from './index.css'

class ResourceContainer extends Component{
	constructor(props){
		super(props)

		this._searchClick = this._searchClick.bind(this)
	}

	_searchClick(){

	}

	UNSAFE_componentWillMount(){
		const { isLogin } = this.props
		if(!isLogin){
			webSessionUtil.redirect()
		}
	}

	render(){
		const { breadcrumbItems, } = this.props
		// if(!isLogin){
		// 	return null
		// }
		return (
			<div>
				<BreadcrumbList breadcrumbItems={breadcrumbItems}/>
				<div className={styles.search}>
				</div>
			</div>
		)
	}
}

function mapStateToProps({systemUser, resource}){
	return {
		isLogin: systemUser.isLogin,
		breadcrumbItems: resource.breadcrumbItems,
	}
}

export default connect(mapStateToProps)(ResourceContainer)