import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {$} from '@core/dom'

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
    const $resizer = $(event.target)
    const type = $resizer.data.resize
    if (type) {
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const sideProp = type === 'col' ? 'bottom' : 'right'
      let value

      $resizer.css({
        [sideProp]: '-5000px',
        opacity: 1
      })

      if (type === 'col') {
        document.onmousemove = e => {
          const delta = e.pageX - coords.right
          value = coords.width + delta
          $resizer.css({right: -delta + 'px'})
        }
      } else {
        document.onmousemove = e => {
          const delta = e.pageY - coords.bottom
          value = coords.height + delta
          $resizer.css({bottom: -delta + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type ==='col') {
          $parent.css({width: value + 'px'})
          this.$root.findAll(`[data-col='${$parent.data.col}']`).forEach(el => {
            el.style.width = value + 'px'
          })
        } else {
          $parent.css({height: value + 'px'})
        }

        $resizer.css({
          bottom: 0,
          right: 0,
          opacity: 0,
        })
      }
    }
  }
}
