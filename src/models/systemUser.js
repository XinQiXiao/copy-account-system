import { userPresenter } from '../presenters'

const { logupRequest } = userPresenter

export default {

	namespace: 'systemUser',

	state: {
		username: '',
		isLogin: false,
		loginModalVisible: false,
		logupModalVisible: false,
	},

	effects: {
		*doLogup({ payload }, { call, put }){
			try{
				let { userData, resolve, reject } = payload
				yield put({ type: 'showLoading' })
				const {data} = yield call(logupRequest, userData)
				if(data && data.success){
					let userInfo = data.userInfo
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
		}
	},

	reducers: {
		logup(state){
			return { ...state, logupModalVisible: true }
		},
		logupSuccess(state, action){
			return { ...state, logupModalVisible: false }
		},
		hideLogupModal(state){
			return { ...state, logupModalVisible: false }
		}
	}
}