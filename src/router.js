import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'

// route components
import { HomePage, IndexPage } from './routes'

export default function({history}){
	return (
		<Router history={history}>
			<Route path='/' component={HomePage}>
				<IndexRoute component={IndexPage}/>
			</Route>
		</Router>
	)
}