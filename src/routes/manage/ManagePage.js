import React, { Component } from 'react'

class ManagePage extends Component{
	constructor(props){
		super(props)
	}

	render(){
		const { children } = this.props
		return (
			<div >
				{children}
			</div>
		)
	}
}

export default ManagePage