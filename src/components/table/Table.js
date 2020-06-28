import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {shouldResize} from './table.functions'
import {resizeHandler} from './table.resize'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }
  toHTML() {
    return createTable(40)
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
