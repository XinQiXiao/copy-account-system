import { browserHistory } from 'dva/router'
import { message } from 'antd'
import _ from 'lodash'

import {contantsConfig} from '../config'

function redirect(){
	message.error('请登录！')
	// browserHistory.push 可能会导致路由丢失，推荐使用 reduxRouter
	browserHistory.push('/')
	return null
}

// 授权验证
function requireAuth(nextState, replace){
	const userInfo = sessionStorage.getItem(contantsConfig.STORAGE_USERINFO)
	if(_.isNil(userInfo)){
		message.error('请登录！')
		replace('/')
	}
}

export {
	redirect,
	requireAuth,
}