import React, { Component } from 'react'

class BillPage extends Component{
	render(){
		const { children } = this.props
		return (
			<div >
				{children}
			</div>
		)
	}
}

export default BillPage