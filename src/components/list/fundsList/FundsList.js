
import React from 'react'
import { Table } from 'antd'

// styles
import styles from './fundsList.css'

// common
import { commonUtil } from '../../../utils'

const { numberFormat } = commonUtil

const dataSource = [
	{
		_id: '10001',
		serialNumber: '001',
		productCode: 'NF-WATER-150',
		productName: '农夫山泉矿泉水',
		productType: '矿泉水',
		purchasePrice: 20,
		salePrice: 35,
		profitPrice: 15,
	},
	{
		_id: '10002',
		serialNumber: '002',
		productCode: 'YB-WATER-120',
		productName: '怡宝矿泉水',
		productType: '矿泉水',
		purchasePrice: 18,
		salePrice: 28,
		profitPrice: 10,
	}
]

const columns = [
	{
		title: '序号',
		dataIndex: 'serialNumber',
		key: 'serialNumber',
		render: (text, record, index) => text === '总计' ? text : <span>{index+1}</span>
	},
	{
		title: '商品编码',
		dataIndex: 'productCode',
		key: 'productCode',
	},
	{
		title: '商品名称',
		dataIndex: 'productName',
		key: 'productName',
	},
	{
		title: '商品类别',
		dataIndex: 'productType',
		key: 'productType',
	},
	{
		title: '购买金额',
		dataIndex: 'purchasePrice',
		key: 'purchasePrice',
		render: (text, record, index)=> numberFormat(text)
	},
	{
		title: '销售金额',
		dataIndex: 'salePrice',
		key: 'salePrice',
		render: (text, record, index)=> numberFormat(text)
	},
	{
		title: '利润额',
		dataIndex: 'profitPrice',
		key: 'profitPrice',
		render: (text) => <span style={{color: 'red'}}>{numberFormat(text)}</span>
	}
]

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows)=>{
		console.log(`_onChange selectedRowKeys:${selectedRowKeys}`, ' selectedRows:', selectedRows)
	},
	onSelect: (record, selected, selectedRows)=>{
		console.log('_onSelect record:', record,` selected:${selected}`, ' selectedRows:', selectedRows)
	},
	onSelectAll: (selected, selectedRows, changeRows)=>{
		console.log(`_onSelectAll selected=${selected}`, ' selectedRows:', selectedRows, ' changeRows:', changeRows)
	},
	getCheckboxProps: record=>({
		disabled: record.name === 'Disabled User'
	})
}

const computeTotal = (dataSource, key)=>{
	return dataSource.map(data=> data[key]).reduce((total, amount)=> total += amount, 0)
}

const getTotalData = (dataSource)=>{
	if(!dataSource.computed){
		let totalData = {
			_id: 'total',
			serialNumber: '总计',
			productCode: '',
			productName: '',
			productType: '',
			purchasePrice: computeTotal(dataSource, 'purchasePrice'),
			salePrice: computeTotal(dataSource, 'salePrice'),
			profitPrice: computeTotal(dataSource, 'profitPrice'),
		}
		dataSource.push(totalData)
		dataSource.computed = true
	}
	return dataSource
}

const FundsList = ()=>{
	return (
		<div className={styles.listContainer}>
			<Table 
				dataSource={dataSource && getTotalData(dataSource)} 
				columns={columns}
				rowKey={record => record._id}
				pagination={false}
				rowSelection={rowSelection}
				loading={false}
			/>
		</div>
	)
}

export default FundsList