import qs from 'qs'
import { request } from '../helpers'

// const 
const PRODUCT_PATH = `/api/products`

export async function query(params){
	return request(`${PRODUCT_PATH}?${qs.stringify(params)}`)
}