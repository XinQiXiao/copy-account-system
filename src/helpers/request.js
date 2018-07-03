// apiClient 目前只解决 post 方法
import fetch from 'dva/fetch'
import { apiHost, apiPort, apiHeaderOptions } from './config'

function parseJSON(response){
	return response.json()
}

function checkStatus(response){
	if(response.status >= 200 && response.status <= 300){
		return response
	}

	const error = new Error(response.statusText)
	error.response = response
	throw error 
}

export function request(url, options){
	const urlPrefix = 'http://' + apiHost + ':' + apiPort
	const urlPath = `${urlPrefix}${url}`
	console.log('request url=>', urlPath, ' options=>', options)
	const configOptions = {...apiHeaderOptions, ...options}
	console.log('configOptions=>', configOptions)
	return fetch(urlPath, configOptions).then(checkStatus)
					.then(parseJSON)
					.then((data)=> {
						console.log('request data=>', data)
						return {data}
					})
					.catch((err)=>{
						console.log('request err=>', err)
						return {err}
					})
}