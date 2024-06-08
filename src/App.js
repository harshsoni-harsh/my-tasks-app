import './App.css'
import {Component} from 'react'
import {v4 as uuid} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    tasks: [],
    inputVal: '',
    tag: tagsList[0].optionId,
    filterTag: '',
  }

  changeInput = e => {
    this.setState({inputVal: e.target.value})
  }

  submitForm = e => {
    e.preventDefault()
    const {inputVal} = this.state
    if (inputVal)
      this.setState(prev => ({
        inputVal: '',
        tag: tagsList[0].optionId,
        tasks: [
          ...prev.tasks,
          {text: prev.inputVal, tag: prev.tag, id: uuid()},
        ],
        filterTag: '',
      }))
  }

  changeFilter = e => {
    this.setState(prev =>
      prev.filterTag === '' ? {filterTag: e.target.value} : {filterTag: ''},
    )
  }

  changeTag = e => {
    this.setState({tag: e.target.value})
  }

  render() {
    const {tasks, tag, inputVal, filterTag} = this.state
    return (
      <div className="outerDiv">
        <form onSubmit={this.submitForm}>
          <h1>Create a task</h1>
          <label htmlFor="task">Task</label>
          <input
            value={inputVal}
            onChange={this.changeInput}
            id="task"
            placeholder="Enter the task here"
          />
          <label htmlFor="Tags">Tags</label>
          <select value={tag} id="Tags" onChange={this.changeTag}>
            {tagsList.map((tagItem, index) => (
              <option
                selected={index === 0}
                key={tagItem.optionId}
                value={tagItem.optionId}
              >
                {tagItem.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <div className="rightDiv">
          <h1>Tags</h1>
          <ul className="tags">
            {tagsList.map(tagItem => (
              <li key={tagItem.optionId}>
                <button
                  className={tagItem.optionId === filterTag ? 'active' : ''}
                  type="button"
                  onClick={this.changeFilter}
                  value={tagItem.optionId}
                >
                  {tagItem.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {tasks.filter(obj => obj.tag.indexOf(filterTag) !== -1).length ===
          0 ? (
            <div className="center">
              <p>No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks">
              {tasks
                .filter(obj => obj.tag.indexOf(filterTag) !== -1)
                .map(task => (
                  <li className="taskItem" id={task.id} key={task.id}>
                    <p>{task.text}</p>
                    <button type="button">{task.tag}</button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
