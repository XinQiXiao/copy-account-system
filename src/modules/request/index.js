import { ApiClient } from '../../helpers'

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