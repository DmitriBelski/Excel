import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from './table.template'
import {shouldResize, nextSelector, isCell, matrix} from './table.functions'
import {resizeHandler} from './table.resize'
import {TableSelection} from './TableSelection'

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
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      // фокус на уже выбраной ячейке
      this.selection.current.focus()
      // // фокус смещается на ячейку вниз
      // const id = this.selection.current.id(true)
      // const $cell = this.$root.find(`[data-id="${id.row + 1}:${id.col}"]`)
      // this.selection.select($cell)
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:input', $cell)
  }
  toHTML() {
    return createTable(40)
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
        this.$emit('table:select', $target)
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
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

