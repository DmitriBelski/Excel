export class Emitter {
  constructor() {
    this.listeners = {}
  }
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// const emiter = new Emitter()

// emiter.subscribe('Vladilen', (surname) => {console.log('vlad: ', surname)})
// emiter.subscribe('Vladilen', (surname) => {console.log('vladik: ', surname)})
// emiter.emit('Vladilen', 'Borisov')
