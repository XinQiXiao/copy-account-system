import { requestData } from '../modules'

// const
const COMMON_PATH = '/system'
const LOGUP_PATH = `${COMMON_PATH}/logup`

export async function logupRequest(params){
	try {
		const ret = await requestData({path: LOGUP_PATH, data: params})
		return ret
	} catch (e){
		throw e
	}
}