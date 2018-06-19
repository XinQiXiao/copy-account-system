
const debug = process.env.NODE_ENV === 'development'

const register = debug ? true : false

export {
	register
}