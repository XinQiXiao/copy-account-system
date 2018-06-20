
//
import './index.html'
import './index.less'

import dva from 'dva'
import { browserHistory } from 'dva/router'

// router
import router from './router'

// models
import { systemUser } from './models'


// 1. Initialize
const app = dva({
	history: browserHistory
})

// 2. Plugins
// app.use({})

// 3. Modal
app.model(systemUser)

// 4. Router
app.router(router)

// 5. Start
app.start('#root')