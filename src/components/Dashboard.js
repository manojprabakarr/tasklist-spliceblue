import React from 'react';

import Task from './Task';

function Dashboard() {
  return (
    <div className="dashboard">
     <div className="header"></div>

     <div className="tasksection">
      <Task/>
     
     </div>
      
    </div>
  );
}

export default Dashboard;