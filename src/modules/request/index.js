import { ApiClient } from '../../helpers'

// requestData 默认都是 post 方法
async function requestData({path, data}){
	try {
		let requestClient = new ApiClient()
		const ret = await requestClient.post(path, {data})
		return ret
	} catch(e){
		throw e
	}
}

export {
	requestData
}