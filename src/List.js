import React, { useState } from 'react'
import './List.css'

// 如何使用回车键也能添加

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
    <div className="wrapper">
      <h1 className="title">TODO LIST</h1>
      <ul>
        {undoList.map((item, index) => {
          return (
            <li className="undoItem item" key={index + '11'}>
              <div className="left">
                <div className="tick" onClick={() => handleFinish(index)}>
                  ✓
                </div>
                <div className="content">{item}</div>
              </div>

              <div className="delete" onClick={() => undoDelete(index)}>
                ×
              </div>
            </li>
          )
        })}
      </ul>
      <ul>
        {doneList.map((item, index) => {
          return (
            <li className="doneItem item" key={index + '22'}>
              <div className="left">
                <div className="tick" onClick={() => handleCancel(index)}>
                  ✓
                </div>
                <div className="content">{item}</div>
              </div>

              <div className="delete" onClick={() => doneDelete(index)}>
                ×
              </div>
            </li>
          )
        })}
      </ul>
      <div className="inputBox">
        <input
          placeholder="add a new todo..."
          onChange={handleChange}
          value={text}
        />
        <button onClick={addList}>ADD</button>
      </div>
    </div>
  )
}
