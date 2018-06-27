import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'

// route components
import { HomePage, IndexPage, BillPage, ManagePage, CustomerPage } from './routes'

// util
import { webSessionUtil } from './utils'

export default function({history}){
	return (
		<Router history={history}>
			<Route path='/' component={HomePage}>
				<IndexRoute component={IndexPage}/>
				<Route path='/customer' onEnter={webSessionUtil.requireAuth} component={CustomerPage}/>

				<Route path='/bill' component={BillPage}/>
				<Route component={BillPage}>
				</Route>

				<Route path='/manage' component={ManagePage}/>
				<Route component={ManagePage}>
					<Route path='/customer' component={CustomerPage}/>
				</Route>
			</Route>
		</Router>
	)
}