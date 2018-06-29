import numeral from 'numeral'

const numberFormat = (num)=> numeral(num).format('0,0.00')

export {
	numberFormat
}