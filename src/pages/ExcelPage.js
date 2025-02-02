import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Toolbar} from '@/components/toolbar/toolbar'
import {Header} from '@/components/header/header'
import {Table} from '@/components/table/table'
import {Formula} from '@/components/formula/formula'
import {rootReducer} from '@/redux/rootReducer'
import {createStore} from '@core/store/createStore'
import {storage, debounce} from '@core/utils'
import {normalizeIntialState} from '@/redux/initialState'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeIntialState(state))

    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 400)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
