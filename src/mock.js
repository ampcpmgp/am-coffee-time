import isAsyncFunction from 'is-async-function'
import {getActions} from './utils/pattern'

console.clear()

const actions = getActions()

export default (mockAction) => {
  let p = Promise.resolve()

  for (const action of actions) {
    const [actionName, ...args] = action
    let actionFunc
    try {
      actionFunc = eval(`mockAction.${actionName}`) // eslint-disable-line
    } catch (e) {
      const errorMsg = `cannot find action - "${actionName}" `
      throw errorMsg
    }
    if (!actionName) continue
    if (!actionFunc) {
      const errorMsg = `"${actionName}" is undefined`
      throw errorMsg
    }
    if (isAsyncFunction(actionFunc)) {
      p = p.then(() => actionFunc(...args))
    } else {
      actionFunc(...args)
    }
  }
}
