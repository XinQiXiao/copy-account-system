import React from 'react'

// components
import { Header } from '../../components'

import styles from './index.css'

const HomePage = ({children})=>{
	const height = window.innerHeight - 64
	return (
		<div className={styles.homePage}>
			<Header />
			<div className={styles.container} style={{height}}>
				{children}
			</div>
		</div>
	)
}

export default HomePage