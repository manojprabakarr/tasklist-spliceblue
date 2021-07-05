import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

import { selectTask } from '../features/Taskslice';

function TaskList({ msg, date, id }) {
  const task = useSelector(selectTask);

  const Edittask = () => {
    //open accordion for editing
    const accordionRoot = document.querySelector(".MuiAccordion-root");
    const accordionSummary = document.querySelector(
      ".MuiAccordionSummary-root"
    );
    const accordionContainer = document.querySelector(".MuiCollapse-container");

    if (
      !accordionRoot.classList.contains("Mui-expanded") &&
      !accordionSummary.classList.contains("Mui-expanded") &&
      !accordionContainer.classList.contains("MuiCollapse-entered")
    ) {
      accordionRoot.classList.add("Mui-expanded");
      accordionSummary.classList.add("Mui-expanded");
      accordionContainer.classList.replace(
        "MuiCollapse-hidden",
        "MuiCollapse-entered"
      );
      accordionContainer.style.height = "auto";
    }

    let index = task.findIndex((task) => task.id === id);
    if (task[index]) {
      let task_msg = document.getElementById("task_msg");
      let task_date = document.getElementById("task_date");
      let task_time = document.getElementById("task_time");
      let assigned_user = document.getElementById("asigned_user");
      task_msg.value = task[index].task_msg;
      task_date.value = task[index].task_date;

      const date = new Date(task[index].task_time * 1000);
      const hours = date.getUTCHours();
      const min = date.getUTCMinutes();

      const convertedTime =
        hours.toString().padStart(2, "0") +
        ":" +
        min.toString().padStart(2, "0");

      task_time.value = convertedTime;

      console.log(task);

      console.log(task[index].assigned_user);
      assigned_user.value = task[index].assigned_user;

      localStorage.setItem("editTask", task[index].id);
    }
  };

  return (
    <div className="tasklist">
      <div className="tasklistcontainer">
        <Avatar />
        <div className="tasklistinfo">
          <h5>{msg}</h5>
          <p>{date}</p>
        </div>
      </div>
      <CreateIcon
        onClick={() => Edittask()}
        style={{
          backgroundColor: "lightgray",
          borderRadius: "999px",
          padding: "8px",
          color: "gray",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default TaskList;
