
import { productsPresenter } from '../presenters'

const resourceModel = {
	namespace: 'resource',

	state: {
		products: [],
		breadcrumbItems: [
			{
				path: '/',
				pathName: '首页'
			},
			{
				path: '/resource',
				pathName: '物资管理'
			}
		]
	},

	subscriptions: {
		setup({dispatch, history}){
			history.listen(location =>{
				if(location.pathname === '/resource'){
					dispatch({type: 'queryProducts'})
					// dispatch({type: 'query'})
				}
			})
		}
	},

	effects: {
		*queryProducts({payload}, {select, call, put}){
			try{
				const isLogin = yield select(({systemUser})=> systemUser.isLogin)
				if(!isLogin)
					return
				const ret = yield call(productsPresenter.query, {})
				const {data} = ret  
				if(data && data.success){
					yield put({
						type: 'queryProductsSuccess',
						products: data.propucts
					})
				}
			}catch(e){
				console.log('queryProducts e==>', e)
			}
		}
	},

	reducers: {
		queryProductsSuccess(state, action){
			const products = action.products 
			products.unshift({'_id': '00000', productName: '全部'})
			return {
				...state, 
				products
			}
		}
	}
}

export default resourceModel