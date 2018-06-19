import React from 'react'

// style
import styles from './index.css'

// config
import { contantsConfig } from '../../config'

const IndexPage = ()=>{
	return (
		<div className={styles.normal}>
			<h1>{contantsConfig.SYSTEM_NAME+'首页'}</h1>
			<div className={styles.welcome}/>
		</div>
	)
}

export default IndexPage