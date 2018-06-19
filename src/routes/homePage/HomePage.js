import React from 'react'

// components
import { Header, SystemInfo } from '../../components'

import styles from './index.css'

const HomePage = ({children})=>{
	const height = window.innerHeight - 64
	return (
		<div className={styles.homePage}>
			<Header />
			<SystemInfo />
			<div className={styles.container} style={{height}}>
				{children}
			</div>
		</div>
	)
}

export default HomePage