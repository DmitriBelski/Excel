import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {parse} from '@core/parse'
import {createTable} from './table.template'
import {shouldResize, nextSelector, isCell, matrix} from './table.functions'
import {resizeHandler} from './table.resize'
import {TableSelection} from './TableSelection'
import {defaultStyles} from '@/constants'

import * as actions from '@/redux/action'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })
    this.$on('formula:done', () => {
      // фокус на уже выбраной ячейке
      this.selection.current.focus()
      // // фокус смещается на ячейку вниз
      // const id = this.selection.current.id(true)
      // const $cell = this.$root.find(`[data-id="${id.row + 1}:${id.col}"]`)
      // this.selection.select($cell)
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectIds
      }))
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }
  toHTML() {
    return createTable(40, this.store.getState())
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('resize error', e.message)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }
  onKeydown(event) {
    const key = event.key
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
    ]
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      value,
      id: this.selection.current.id()
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}

