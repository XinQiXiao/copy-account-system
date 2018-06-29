import React, { Component } from 'react'

// components
import { StockList } from '../tableList'

// styles
import styles from './stock.css'

class StockComponent extends Component{
	render(){
		return (
			<div className={styles.stockContainer}>
				<h2 className={styles.stockTitle}>仓库明细表</h2>
				<StockList />
			</div>
		)
	}
}

export default StockComponent