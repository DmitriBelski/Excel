import {Excel} from '@/components/excel/Excel'
import {Toolbar} from '@/components/toolbar/toolbar'
import {Header} from '@/components/header/header'
import {Table} from '@/components/table/table'
import {Formula} from '@/components/formula/formula'
import {rootReducer} from '@/redux/rootReducer'
import {createStore} from '@core/createStore'
import {storage, debounce} from '@core/utils'
import {initialState} from '@/redux/initialState'
import './scss/index.scss'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 400)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
