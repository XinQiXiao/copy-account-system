
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Select } from 'antd'
import _ from 'lodash'

// styles
import styles from './index.css'

// const
const FormItem = Form.Item
const Option = Select.Option

class SearchSelect extends Component{
	constructor(props){
		super(props)

		this._onSubmit = this._onSubmit.bind(this)
	}

	_onSubmit(e){
		const {onSearchClick} = this.props
		const {validateFields} = this.props.form
		if(_.isFunction(onSearchClick)){
			e.preventDefault()
			validateFields((err, values)=>{
				console.log('_onSubmit validateFields err=>', err, ' & values=>', values)
				if(!!err)
					return
				onSearchClick(values)
			})
		}
	}


	render(){
		const { products } = this.props
		const { getFieldDecorator } = this.props.form
		return (
			<div className={styles.container}>
				<Form layout='inline' onSubmit={this._onSubmit} className={styles.formContainer}>
					<FormItem label='商品名称：'>
						{
							getFieldDecorator('productId')(
								<Select style={{minWidth: 150}}>
									{
										products.map(({_id, productName})=>{
											return <Option key={_id}>{productName}</Option>
										})
									}
								</Select>
							)
						}
					</FormItem>
					<Button type='primary' htmlType='submit'>搜索</Button>
				</Form>
			</div>
		)
	}
}

SearchSelect.propTypes = {
	onSearchClick: PropTypes.func,
	products: PropTypes.array,
	form: PropTypes.object.isRequired,
}

export default Form.create()(SearchSelect)