import {ExcelStateComponents} from '@core/ExcelStateComponent'
import {createToolbar} from './toolbar.template'
import {$} from '@core/dom'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponents {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  // init() {
  //   super.init()
  //   this.$on('table:select', $cell => {
  //     const storeStyle = this.store.getState().cellStyle[$cell.data.id]
  //     this.prepare()
  //     this.setState(storeStyle)
  //   })
  // }

  storeChanged({currentStyles}) {
    this.setState(currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
