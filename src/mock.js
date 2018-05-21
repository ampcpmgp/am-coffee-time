import { getActions } from './utils/pattern'

const actions = getActions()

export default async mockAction => {
  for (const action of actions) {
    const [actionName, ...args] = action
    let actionFunc
    try {
      actionFunc = eval(`mockAction.${actionName}`) // eslint-disable-line
    } catch (e) {
      const errorMsg = `cannot find action - "${actionName}" `
      console.warn(errorMsg)
      continue
    }
    if (!actionName) continue
    if (!actionFunc) {
      const errorMsg = `"${actionName}" is undefined`
      console.warn(errorMsg)
      continue
    }

    const result = actionFunc(...args)
    if (result && result.then) {
      await result
    }
  }
}
