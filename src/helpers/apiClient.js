import fetch from 'dva/fetch'
import _ from 'lodash'
import { apiHost, apiPort, apiHeaderOptions } from './config'

// const 
const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl(path){
	const adjustedPath = ( path[0] !== '/' ) ? ( '/' + path ) : path
	return 'http://' + apiHost + ':' + apiPort + adjustedPath
}

// function toQueryString(obj){
// 	return obj ? Object.keys(obj).sort().map(key => {
// 		let val = obj[key]
// 		if(_.isArray(val)){
// 			return val.sort().map(val2 => {
// 				return key + '=' + val2
// 			}).join('&')
// 		}
// 		return key + '=' + val
// 	}).join('&') : ''
// }

class ApiClient {
	constructor(req){
		methods.forEach((method) => {
			this[method] = (path, {params, data}) => new Promise((resolve, reject) => {
				// path = formatUrl(path) + toQueryString(params)
				path = formatUrl(path)
				console.log(path + ' request data =>', data)
				fetch(path, {
					method,
					...apiHeaderOptions,
					body: JSON.stringify(data || {}),
				}).then((response)=>{ 
					// console.log('response json before=>', response)
					if(response.status >= 200 && response.status < 300){
						return response.json()
					}
					let error = new Error(response.statusText)
					error.response = response
					throw error
				}).then((receive) => {
					console.log('receive json=>', receive)
					if(_.isNil(receive)){
						reject(new Error('receive is nil'))
					} else {
						resolve({data: receive}) 
					}
				}).catch((err) => {
					console.log(path + 'fetch err=>', err)
					reject(err)
				})
				
			})
		})
	}
}

export default ApiClient