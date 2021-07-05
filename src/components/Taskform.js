import React from 'react';

import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

import { pushTask } from '../features/Taskslice';

function Taskform({
  users,
  msg,
  name,
  date,
  time,
  change,
  Sendata,
  tasks,
  value,
  refresh,
}) {
  const dispatch = useDispatch();

  const closeAccordion = () => {
    const accordionRoot = document.querySelector(".MuiAccordion-root");
    const accordionSummary = document.querySelector(
      ".MuiAccordionSummary-root"
    );
    const accordionContainer = document.querySelector(".MuiCollapse-container");

    if (
      accordionRoot.classList.contains("Mui-expanded") &&
      accordionSummary.classList.contains("Mui-expanded") &&
      accordionContainer.classList.contains("MuiCollapse-entered")
    ) {
      value(refresh);
      localStorage.removeItem("editTask");

      accordionRoot.classList.replace("Mui-expanded", ",");
      accordionSummary.classList.replace("Mui-expanded", ",");
      accordionContainer.classList.replace(
        "MuiCollapse-entered",
        "MuiCollapse-hidden"
      );
      accordionContainer.style.height = "0px";
    }
  };

  //deletetask
  const Deletetask = async () => {
    console.log("updated", tasks);
    if (localStorage.getItem("editTask")) {
      await fetch(
        ` https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${localStorage.getItem(
          "editTask"
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjUzMTAxMTUsIm5iZiI6MTYyNTMxMDExNSwianRpIjoiNDU1OTdjYTAtMTEzZi00MGQxLWE2NTAtZWI0NjM3NjhkYTRiIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.vSfSD4LL9gZDwEgtnUg2UYm4oGwLkPC0Y06ustHN9bI",
          },
        }
      )
        .then(() => {
          const Pickone = tasks.filter(
            (task) => task.id !== localStorage.getItem("editTask")
          );
          dispatch(pushTask(Pickone));
          value(refresh);
          alert("task removed successfully");
          localStorage.removeItem("editTask");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <form onSubmit={Sendata}>
      <div className="taskform">
        <div className="taskinput">
          <p>Task description</p>

          <TextField
            className="taskinput_field"
            size="small"
            name="task_msg"
            value={msg}
            id="task_msg"
            onChange={change}
            placeholder="Task description"
            variant="outlined"
            autoComplete="off"
          />
        </div>

        <div className="taskinput2">
          <div className="taskdate">
            <p>Date</p>
            <TextField
              type="date"
              name="task_date"
              id="task_date"
              value={date}
              onChange={change}
              className="taskdate_input"
              variant="outlined"
              size="small"
            />
          </div>

          <div className="tasktime">
            <p>Time</p>
            <TextField
              className="tasktime_input"
              type="time"
              id="task_time"
              name="task_time"
              value={time}
              onChange={change}
              variant="outlined"
              size="small"
              inputProps={{
                step: 1800,
              }}
            />
          </div>
        </div>

        <div className="taskform_user">
          <p>Assign user</p>
          <Select
            variant="outlined"
            className="selectuser"
            id="asigned_user"
            name="asigned_user"
            value={name}
            onChange={change}
          >
            {users &&
              users?.map((user, index) => (
                <MenuItem key={index} value={user.name} selected>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div className="tasks_delete">
          <DeleteIcon
            onClick={() => Deletetask()}
            style={{
              backgroundColor: "#ffcccb",
              borderRadius: "999px",
              padding: "10px",
            }}
          />

          <div className="taskform_cancel">
            <p onClick={() => closeAccordion()}>Cancel</p>
            <Button variant="contained" type="submit">
              {" "}
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Taskform;
