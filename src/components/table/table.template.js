import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.styleState[id]
    })
    return `
      <div class="cell" contenteditable 
      data-col="${col}"
      data-type="cell"
      data-id="${id}"
      data-value="${data || ''}"
      style="width:${width};${styles}"
      >${parse(data) || ''}</div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
    <div class="column" 
    data-type="resizable" 
    data-col="${index}"
    style="width:${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div class="row" 
    data-type="resizable" 
    style="height:${height}"
    data-row="${index}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    const width = getWidth(state, index)
    return {
      col, index, width
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const rows = []
  const colsCount = CODES.Z - CODES.A + 1

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('')
  rows.push(createRow(null, cols, {}))

  for (let row=0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
