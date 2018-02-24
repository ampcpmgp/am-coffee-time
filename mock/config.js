import Test from 'am-coffee-time/browser/Test'
import patterns from './data/patterns.yml'
import {
  setPatterns
} from '../src/actions'
import sleep from '../src/utils/sleep'

Test.start({
  ヘルプを開く: async () => {
    await sleep(1000)
    const el = document.querySelector('parts-header > .question')
    const evt = new window.MouseEvent('click')
    el.dispatchEvent(evt)
  },
  フル設定 () {
    setPatterns(patterns)
  }
})
