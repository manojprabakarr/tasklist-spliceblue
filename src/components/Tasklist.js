import React from 'react';

import { useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
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

    let data = task.findIndex((task) => task.id === id);
    if (task[data]) {
      let task_msg = document.getElementById("task_msg");
      let task_date = document.getElementById("task_date");
      let task_time = document.getElementById("task_time");
      let asigned_user = document.getElementById("asigned_user");

      task_msg.value = task[data].task_msg;
      task_date.value = task[data].task_date;

      const convertedTime = new Date(task[data].task_time * 60 * 60 * 24)
        .toTimeString()
        .slice(0, 5);
      task_time.value = convertedTime;

      asigned_user.value = task[data].assigned_user;
      localStorage.setItem("editTask", task[data].id);
    }
  };




  return (
    <div className="tasklist">
      <div className="tasklistcontainer">
        <Avatar />
        <div className="tasklistinfo">
          <h5>{ msg}</h5>
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