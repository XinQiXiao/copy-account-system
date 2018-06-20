/**
 * create at 06/20/18
 */

const debug = process.env.NODE_ENV === 'development'

// 服务器端口
const apiPort = '4000'

// 服务器地址
// 开发模式，服务器地址
const apiHostDev = 'localhost'

// 跨域请求头配置
const headerOptionsDev = {
	mode: 'cors',
	credentials: 'include',
	headers: {
		'content-type': 'application/json'
	},
}

// 部署模式，服务器地址
const apiHostProd = '';
// 同域请求头配置
const headerOptionsProd = {
	credentials: 'same-origin',
	headers: {
		'content-type': 'application/json'
	},
}

// 数据库地址
// 开发模式数据库地址
// const mongooseConnectDev = "mongodb://localhost:27017/accountSystem"

const apiHost = debug ? apiHostDev : apiHostProd
const apiHeaderOptions = debug ? headerOptionsDev : headerOptionsProd

export {
	apiHost,
	apiPort,
	apiHeaderOptions
}