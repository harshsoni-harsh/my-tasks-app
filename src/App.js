import "./App.css";
import { Component } from "react";
import { v4 as uuid } from "uuid";

const tagsList = [
  {
    optionId: "HEALTH",
    displayText: "Health",
  },
  {
    optionId: "EDUCATION",
    displayText: "Education",
  },
  {
    optionId: "ENTERTAINMENT",
    displayText: "Entertainment",
  },
  {
    optionId: "SPORTS",
    displayText: "Sports",
  },
  {
    optionId: "TRAVEL",
    displayText: "Travel",
  },
  {
    optionId: "OTHERS",
    displayText: "Others",
  },
];

class App extends Component {
  state = {
    tasks: [],
    inputVal: "",
    tag: tagsList[0].optionId,
    filterTag: "",
  };

  changeInput = (e) => {
    this.setState({ inputVal: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { inputVal } = this.state;
    if (inputVal)
      this.setState((prev) => ({
        inputVal: "",
        tag: tagsList[0].optionId,
        tasks: [
          ...prev.tasks,
          { text: prev.inputVal, tag: prev.tag, id: uuid() },
        ],
        filterTag: "",
      }));
  };

  changeFilter = (e) => {
    this.setState((prev) => {
      return prev.filterTag === ""
        ? { filterTag: e.target.value }
        : { filterTag: "" };
    });
  };

  changeTag = (e) => {
    this.setState({ tag: e.target.value });
  };

  render() {
    const { tasks, tag, inputVal, filterTag } = this.state;
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
          <label htmlFor="tags">Tags</label>
          <select value={tag} id="tags" onChange={this.changeTag}>
            {tagsList.map((tag, index) => (
              <option
                selected={index === 0}
                key={tag.optionId}
                value={tag.displayText}
              >
                {tag.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <div className="rightDiv">
          <h1>Tags</h1>
          <ul className="tags">
            {tagsList.map((tag) => (
              <li key={tag.optionId}>
                <button
                  className={tag.optionId === filterTag && "active"}
                  type="button"
                  onClick={this.changeFilter}
                  value={tag.displayText}
                >
                  {tag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {tasks.length === 0 ? (
            <div className="center">
              <p>No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks">
              {tasks
                .filter(
                  (obj) => obj.tag.toUpperCase().indexOf(filterTag) !== -1
                )
                .map((task) => (
                  <li key={task.id}>
                    <li>
                      <p>{task.text}</p>
                    </li>
                    <li>
                      <button type="button">{task.tag}</button>
                    </li>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
