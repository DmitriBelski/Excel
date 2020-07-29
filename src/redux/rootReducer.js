import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE} from './types'

// Pure functions
export function rootReducer(state, action) {
  // let prevState
  // let prevStyle
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      // prevState = state[field] || {}
      // prevState[action.data.id] = action.data.value
      return {...state, [field]: value(field, state, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      // prevState = state['dataState'] || {}
      // prevState[action.data.id] = action.data.value
      return {...state, currentText: action.data.value, [field]: value(field, state, action)}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'styleState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}}
    case CHANGE_TITLE:
      console.log('action.data', action.data)
      return {...state, title: action.data}
    default: return state
  }
}

function value(field, state, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}

