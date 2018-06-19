import React from 'react'

// style
import styles from './index.css'

// config
import { contantsConfig } from '../../config'

const SystemInfo = ({}) => {
	return (
		<div className={styles.systemInfo}>
			<span className={styles.systemName}>{contantsConfig.SYSTEM_NAME}</span>
		</div>
	)
}

export default SystemInfo