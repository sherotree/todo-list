import React, { useState } from 'react'
import './List.css'
import { list } from 'postcss'

export function List() {
  const [text, setText] = useState('')
  const [undoList, setUndoList] = useState([])
  const [doneList, setDoneList] = useState([])

  function handleChange(e) {
    setText(e.target.value)
  }

  function addList() {
    setUndoList([...undoList, text])
    setText('')
  }

  function handleCancel(index) {
    const currentItem = doneList[index]
    doneList.splice(index, 1)
    setDoneList([...doneList])
    setUndoList([...undoList, currentItem])
  }

  function undoDelete(index) {
    undoList.splice(index, 1)
    setUndoList([...undoList])
  }

  function doneDelete(index) {
    doneList.splice(index, 1)
    setDoneList([...doneList])
  }

  function handleFinish(index) {
    const currentItem = undoList[index]
    // setUndoList(undoList.splice(index,1))
    undoList.splice(index, 1)
    setUndoList([...undoList])
    setDoneList([...doneList, currentItem])
  }

  return (
    <div>
      <h1 className="title">TODO LIST</h1>
      <ul>
        {undoList.map((item, index) => {
          return (
            <li className="undoItem" key={index + '11'}>
              <div>
                <span onClick={() => handleFinish(index)}>√</span>
                <span>{item}</span>
              </div>
              <div onClick={() => undoDelete(index)}>×</div>
            </li>
          )
        })}
      </ul>
      <ul>
        {doneList.map((item, index) => {
          return (
            <li className="doneItem" key={index + '22'}>
              <div>
                <span onClick={() => handleCancel(index)}>√</span>
                <span>{item}</span>
              </div>
              <div onClick={() => doneDelete(index)}>×</div>
            </li>
          )
        })}
      </ul>
      <input
        placeholder="add a new todo..."
        onChange={handleChange}
        value={text}
      />
      <button onClick={addList}>ADD</button>
    </div>
  )
}
