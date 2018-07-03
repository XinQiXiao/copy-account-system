import { requestData } from '../modules' 

// const 
const PRODUCT_PATH = `/api/products`

export async function getProducts(params){
	try{
		const ret = await requestData({path: PRODUCT_PATH, data: params})
		return ret 
	}catch(e){
		throw e
	}
}