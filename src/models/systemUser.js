import { userPresenter } from '../presenters'
import _ from 'lodash'

const { logupRequest, loginRequest, logoutRequest } = userPresenter

// const 
const UESRINFO_KEY = 'userInfo'

export default {

	namespace: 'systemUser',

	state: {
		username: '',
		authToken: '',
		pathname: '/',
		isLogin: false,
		loginModalVisible: false,
		logupModalVisible: false,
	},

	subscriptions: {
		setup({dispatch, history}){
			history.listen(location => {
				console.log('subscriptions location==>', location)
				if(location.pathname === '/'){
					// 权限验证通过
					const info = sessionStorage.getItem(UESRINFO_KEY)
					console.log('session userInfo=>', info)
					if(!_.isNil(info)){
						dispatch({
							type: 'loginSuccess',
							payload: JSON.parse(info) || {}
						})
					}
				}
			})
		}
	},

	effects: {
		*doLogin({payload}, {call, put}){
			try {
				let {userData, resolve, reject} = payload
				yield put({type: 'showLoading'})
				const {data} = yield call(loginRequest, userData)
				if(data && data.success){
					let userInfo = data.userInfo
					yield sessionStorage.setItem(UESRINFO_KEY, JSON.stringify(userInfo))
					// 登录成功
					yield put({
						type: 'loginSuccess',
						payload: userInfo
					}) 
					resolve()
				} else {
					reject(data)
				}
			}catch(e){
				console.log('doLogin e=>', e)
			}
		},
		*doLogup({ payload }, { call, put }){
			try{
				let { userData, resolve, reject } = payload
				yield put({ type: 'showLoading' })
				const {data} = yield call(logupRequest, userData)
				if(data && data.success){
					let userInfo = data.userInfo
					yield sessionStorage.setItem(UESRINFO_KEY, JSON.stringify(userInfo))
					yield put({
						type: 'logupSuccess',
						payload: userInfo
					})
					resolve()
				} else {
					reject(data)
				}
			}catch(e){
				console.log('doLogup e=>', e)
			}
		},
		*doLogout({ payload }, { call, put }){
			try{
				const { data } = yield call(logoutRequest)
				if(data && data.success){
					yield sessionStorage.removeItem(UESRINFO_KEY)
					yield put({
						type: 'logoutSuccess'
					})
				}
			}catch(e){
				console.log('doLogout e=>', e)
			}
		}
	},

	reducers: {
		login(state){
			return { 
				...state, 
				loginModalVisible: true 
			}
		},
		logup(state){
			return { 
				...state, 
				logupModalVisible: true 
			}
		},
		loginSuccess(state, action){
			let userInfo = action.payload
			return {
				...state,
				...userInfo,
				isLogin: true,
				loginModalVisible: false,
			}
		},
		logupSuccess(state, action){
			let userInfo = action.payload
			return { 
				...state, 
				...userInfo, 
				isLogin: true, 
				logupModalVisible: false 
			}
		},
		logoutSuccess(state){
			return { 
				...state, 
				username: '', 
				authToken: '', 
				isLogin: false 
			}
		},
		hideLoginModal(state){
			return { 
				...state, 
				loginModalVisible: false 
			}
		},
		hideLogupModal(state){
			return { 
				...state, 
				logupModalVisible: false 
			}
		}
	}
}