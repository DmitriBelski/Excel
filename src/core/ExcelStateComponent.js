import {ExcelComponent} from '@core/ExcelComponent'

export class ExcelStateComponents extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }
  initState(initialState = {}) {
    this.state = {...initialState}
  }

  setState(state) {
    this.state = {...this.state, ...state}
    this.$root.html(this.template)
  }
}
