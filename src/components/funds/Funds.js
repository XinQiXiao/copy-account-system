import React, { Component } from 'react'

// components
import { FundsList } from '../list'

// styles
import styles from './funds.css'

class StockComponent extends Component{
	render(){
		return (
			<div className={styles.fundsContainer}>
				<h2 className={styles.fundsTitle}>资金明细表</h2>
				<FundsList />
			</div>
		)
	}
}

export default StockComponent