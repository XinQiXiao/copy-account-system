import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'

// components
import NavLink from '../navLink/NavLink'

// styles
import styles from './index.css'

// const
const BreadcrumbItem = Breadcrumb.Item

class BreadcrumbList extends Component{
	render(){
		const { breadcrumbItems } = this.props
		return (
			<div className={styles.breadcrumb}>
				<Breadcrumb>
					{
						breadcrumbItems.map(({path, pathName}, index)=>{
							return (
								<BreadcrumbItem key={index}>
									<NavLink target={path} linkText={pathName}/>
								</BreadcrumbItem>
							)
						})
					}
				</Breadcrumb>
			</div>
		)
	}
}

BreadcrumbList.propTypes = {
	breadcrumbItems: PropTypes.array,
}

export default BreadcrumbList