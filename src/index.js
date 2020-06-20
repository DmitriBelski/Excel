import {Excel} from '@/components/excel/Excel'
import {Toolbar} from './components/toolbar/toolbar'
import {Header} from './components/header/header'
import {Table} from './components/table/table'
import {Formula} from './components/formula/formula'
import './scss/index.scss'

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})

excel.render()
