
import React from 'react'
import { Table } from 'antd'

// styles
import styles from './stockList.css'

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
		productUnit: '箱',
		inAmount: 100,
		outAmount: 50,
		amount: 50,
		averagePrice: 30,
		stockFunds: 1500,
	},
	{
		_id: '10002',
		serialNumber: '002',
		productCode: 'YB-WATER-120',
		productName: '怡宝矿泉水',
		productType: '矿泉水',
		productUnit: '箱',
		inAmount: 120,
		outAmount: 50,
		amount: 70,
		averagePrice: 25,
		stockFunds: 1750,
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
		title: '商品单位',
		dataIndex: 'productUnit',
		key: 'productUnit',
	},
	{
		title: '入库量',
		dataIndex: 'inAmount',
		key: 'inAmount',
	},
	{
		title: '出库量',
		dataIndex: 'outAmount',
		key: 'outAmount',
	},
	{
		title: '库存量',
		dataIndex: 'amount',
		key: 'amount',
		render: (text) => <span style={{color: 'red'}}>{text}</span>
	},
	{
		title: '销售均价',
		dataIndex: 'averagePrice',
		key: 'averagePrice',
		render: (text, record, index) => record._id !== 'total' ? numberFormat(text) : null
	},
	{
		title: '库存资金',
		dataIndex: 'stockFunds',
		key: 'stockFunds',
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
			productUnit: '',
			inAmount: computeTotal(dataSource, 'inAmount'),
			outAmount: computeTotal(dataSource, 'outAmount'),
			amount: computeTotal(dataSource, 'amount'),
			averagePrice: 0,
			stockFunds: computeTotal(dataSource, 'stockFunds'),
		}
		dataSource.push(totalData)
		dataSource.computed = true
	}
	return dataSource
}

const StockList = ()=>{
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

export default StockList