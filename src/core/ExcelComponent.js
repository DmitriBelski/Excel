import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    // this.storeSub = null
    this.prepare()
  }
  // шаблон ФАСАД
  // Уведомляем слушателей про события
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  // Сюда приходять только изменения по тем полям, на которые мы подписались
  storeChanged() {}
  isWatching(key) {
    return this.subscribe.includes(key)
  }
  // Возвращаем шаблон компонента
  toHTML() {
    return ''
  }
  // Настраиваем наш компонент до init
  prepare() {}
  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }
  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    // this.storeSub.unsubscribe()
  }
}

