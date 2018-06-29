
import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

// components
import { BreadcrumbList, SearchResource, StockComponents } from '../../components'

// util
import { webSessionUtil } from '../../utils'

// style
import styles from './index.css'

const products = [
	{_id: '001', productName: '冰箱'},
	{_id: '002', productName: '电脑'}
]

class ResourceContainer extends Component{
	constructor(props){
		super(props)

		this._searchClick = this._searchClick.bind(this)
		this._settleClick = this._settleClick.bind(this)
	}

	UNSAFE_componentWillMount(){
		const { isLogin } = this.props
		if(!isLogin){
			webSessionUtil.redirect()
		}
	}

	_searchClick(values){
		console.log('_searchClick values=>', values)
	}

	_settleClick(){

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
					<SearchResource onSearchClick={this._searchClick} products={products}/>
					<div className={styles.settleBtn}>
						<Button type='primary' onClick={this._settleClick}>结算</Button>
					</div>
				</div>
				<StockComponents />
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