import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import {
  pushTask,
  selectTask,
} from '../features/Taskslice';
import { AuthorizedUser } from '../features/Userslice';
import Taskform from './Taskform';
import Tasklist from './Tasklist';

function Task() {
     const dispatch = useDispatch();
     
    
     const [user,setuser]=useState([]);
     

       const cache = useSelector(selectTask);
       const tasks = cache;
   


    const initialstate={
      asigned_user:'',
       task_msg:"",
       task_date:"",
       task_time:'00:00',
        is_completed: 0,
       time_zone: new Date().getTimezoneOffset() * 60,

    }
      const [values,setValues]=useState(initialstate);


     const{ asigned_user,task_msg,task_date,task_time,time_zone,is_completed}=values;
     const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

     
     async function Senddata (e) {
       e.preventDefault();
       
          let hourMinute = task_time.split(":");
          console.log(hourMinute )
          let convertedTime = +hourMinute[0] * 60 * 60 + +hourMinute[1] * 60;
          console.log(convertedTime )

          const value ={
             assigned_user: asigned_user,
             task_date: task_date,
             task_time: convertedTime,
            is_completed: is_completed,
            time_zone: time_zone,
           task_msg: task_msg,
          }

          if(!(asigned_user || task_date || task_time || task_msg)) {
            alert("all field requireds");
            return;
           
          }
          
          if (localStorage.getItem("editTask")) {
             return await fetch(
                `https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${localStorage.getItem("editTask")}`,
                {
                   method: "PUT",
                    headers: {
                   "Content-Type": "application/json",
                   Authorization:
                   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjUzMTAxMTUsIm5iZiI6MTYyNTMxMDExNSwianRpIjoiNDU1OTdjYTAtMTEzZi00MGQxLWE2NTAtZWI0NjM3NjhkYTRiIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.vSfSD4LL9gZDwEgtnUg2UYm4oGwLkPC0Y06ustHN9bI",
                    },
                    body: JSON.stringify(value),
                 })
                  .then((res) => res.json())
                  .then((data) => {
                  let updatedtask = tasks.filter(
                   (task) => task.id !== localStorage.getItem("editTask"));
                  dispatch(pushTask([data.results, ...updatedtask]));
                   if (data.status === "success") {
                   alert("Task updated succesfully.");
                   localStorage.removeItem("editTask"); 
                   }
             })
              .catch((err) => {
                console.log(err.message);
              });
      } 
     

           
          //sendatask
         return  await fetch('https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
                 Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjUzMTAxMTUsIm5iZiI6MTYyNTMxMDExNSwianRpIjoiNDU1OTdjYTAtMTEzZi00MGQxLWE2NTAtZWI0NjM3NjhkYTRiIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.vSfSD4LL9gZDwEgtnUg2UYm4oGwLkPC0Y06ustHN9bI",
            },
            body: JSON.stringify(value),
          })
         
         .then((res) => res.json())
        .then((data) => {
          console.log("userdata",data);
          dispatch(pushTask([data.results, ...tasks]));
             if (data.status === "success") {
               setValues(initialstate);
               alert("Task added succesfully.");
               
               }
            
        })
        .catch((err) => {
          console.log(err.message);
        });
         
    

    }
     
          
     

     

   

     
    


   


 
 
  

   //fetch users 
    useEffect(()=>{
        async function fetchdata() {
           
            const request = await fetch("https://stage.api.sloovi.com/team",{
                method: "GET",
                 headers: {
                 Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjUzMTAxMTUsIm5iZiI6MTYyNTMxMDExNSwianRpIjoiNDU1OTdjYTAtMTEzZi00MGQxLWE2NTAtZWI0NjM3NjhkYTRiIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.vSfSD4LL9gZDwEgtnUg2UYm4oGwLkPC0Y06ustHN9bI",
                   },
                   })
                    .then((res)=>res.json())
                    try {
                        
                    const users = request.results.data;
                    
                     const acceptedusers=users.filter((user)=>{
                         return user.user_status === "accepted";
                         })
                         dispatch(AuthorizedUser({ acceptedusers }));
                         setuser(acceptedusers);
           
                    }
                    catch(err){
                        console.log(err.message)
                    }
             }
             fetchdata()
              },[dispatch])


        //gettasklists
        useEffect(()=>{
            async function fetchAlltask() {
                  return await fetch("https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",{
                method: "GET",
                 headers: {
                 Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjUzMTAxMTUsIm5iZiI6MTYyNTMxMDExNSwianRpIjoiNDU1OTdjYTAtMTEzZi00MGQxLWE2NTAtZWI0NjM3NjhkYTRiIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.vSfSD4LL9gZDwEgtnUg2UYm4oGwLkPC0Y06ustHN9bI",
                   },
                   })
                   .then((res) => res.json())
                    .then((data) => {
                      dispatch(pushTask(data.results));
                      })
                      .catch((err) => {
                        console.log(err.message);
                        });
                         }
                         fetchAlltask();
                         }, [dispatch]);

              return (
                 <div className="tasks">
                     <Accordion>
                         <AccordionSummary expandIcon={<AddIcon />}>
                             <Typography className="">
                              Tasks {""}
                               <span style={{ color: "gray" }}>{tasks ? tasks?.length : ""}</span>
                             </Typography>
                          </AccordionSummary>
                          <AccordionDetails className="taskdiscription">
                              <Taskform 
                                tasks={tasks ? tasks : []}
                                users={user} 
                                msg={task_msg}
                                name={asigned_user}
                                date={task_date}
                                time={task_time}
                                change={handleChange}
                                Sendata={Senddata}
                                value={setValues}
                                refresh={initialstate}
                                />
                          </AccordionDetails>
                      </Accordion>
                      <div className="tasktwo">
                        {tasks
                         ? tasks?.map((task) => (
                         <Tasklist
                         key={task.id}
                         id={task.id}
                         msg={task.task_msg}
                         date={task.task_date}
                         />
                          ))
                         :null}
                      
                      
                      </div>
                      
                </div>
  
                  
                    
             );
}

export default Task;
