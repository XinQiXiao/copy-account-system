import { requestData } from '../modules'

// const
const COMMON_PATH = '/system'
const LOGUP_PATH = `${COMMON_PATH}/logup`
const LOGIN_PATH = `${COMMON_PATH}/login`
const LOGOUT_PATH = `${COMMON_PATH}/logout`

// 注册
export async function logupRequest(params){
	try {
		const ret = await requestData({path: LOGUP_PATH, data: params})
		return ret
	} catch (e){
		throw e
	}
}
// 登录
export async function loginRequest(params){
	try {
		const ret = await requestData({path: LOGIN_PATH, data: params})
		return ret
	} catch (e){
		throw e
	}
}
// 退出登录
export async function logoutRequest(){
	try {
		const ret = await requestData({path: LOGOUT_PATH})
		return ret
	} catch (e){
		throw e
	}
}