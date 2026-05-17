import axios from 'axios';
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';

export default function Dashboard() {

const [goals, setGoals] = useState([]);

const [logs, setLogs] = useState([]);

const role =
localStorage.getItem('role');



useEffect(() => {

 fetchGoals();

 fetchLogs();

}, []);



// ======================================
// FETCH GOALS
// ======================================
const fetchGoals = async () => {

 try {

   const res = await axios.get(

      'https://enterprise-goal-backend.onrender.com/api/goals',

      {
         headers: {
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   setGoals(res.data);

 } catch (err) {

   console.log(err);

 }

};



// ======================================
// FETCH AUDIT LOGS
// ======================================
const fetchLogs = async () => {

 try {

   const res = await axios.get(

      'https://enterprise-goal-backend.onrender.com/api/goals/audit/logs',

      {
         headers: {
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   setLogs(res.data);

 } catch (err) {

   console.log(err);

 }

};



// ======================================
// KPI CALCULATIONS
// ======================================
const total = goals.length;

const approved =
goals.filter(
g => g.status === 'Approved'
).length;

const pending =
goals.filter(
g => g.status === 'Pending'
).length;

const rejected =
goals.filter(
g => g.status === 'Rejected'
).length;

const completion =
total === 0
? 0
: Math.round((approved / total) * 100);



// ======================================
// TOTAL WEIGHTAGE
// ======================================
const totalWeightage =
goals.reduce(
(a,g)=>a + g.weightage,
0
);



// ======================================
// RECENT PENDING
// ======================================
const pendingGoals =
goals.filter(
g => g.status === 'Pending'
);



return (

<MainLayout>

<h1>Executive Dashboard</h1>



{/* ====================================== */}
{/* KPI CARDS */}
{/* ====================================== */}
<div style={{

 display: 'grid',

 gridTemplateColumns:
 'repeat(auto-fit,minmax(220px,1fr))',

 gap: '20px',

 marginTop: '25px'

}}>

<Card
title='Total Goals'
value={total}
/>

<Card
title='Approved Goals'
value={approved}
/>

<Card
title='Pending Reviews'
value={pending}
/>

<Card
title='Rejected Goals'
value={rejected}
/>

<Card
title='Completion Rate'
value={`${completion}%`}
/>

<Card
title='Total Weightage'
value={`${totalWeightage}%`}
/>

</div>



{/* ====================================== */}
{/* ROLE BADGE */}
{/* ====================================== */}
<div style={{

 marginTop:'25px',

 background:'white',

 padding:'20px',

 borderRadius:'18px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Current Role</h2>

<div style={{

 marginTop:'15px',

 display:'inline-block',

 background:
 role === 'Admin'
 ? '#dbeafe'
 : role === 'Manager'
 ? '#dcfce7'
 : '#fef3c7',

 color:
 role === 'Admin'
 ? '#1d4ed8'
 : role === 'Manager'
 ? '#15803d'
 : '#92400e',

 padding:'10px 18px',

 borderRadius:'20px',

 fontWeight:'bold'

}}>

{role}

</div>

</div>



{/* ====================================== */}
{/* PENDING APPROVALS */}
{/* ====================================== */}
{role !== 'Employee' && (

<div style={{

 marginTop:'25px',

 background:'white',

 padding:'20px',

 borderRadius:'18px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Pending Approvals</h2>

{pendingGoals.length===0 && (

<p style={{
marginTop:'15px',
color:'#666'
}}>
No pending approvals.
</p>

)}

<div style={{
marginTop:'15px'
}}>

{pendingGoals.map(goal=>(

<div

key={goal._id}

style={{

 borderBottom:'1px solid #ddd',

 padding:'15px 0'

}}

>

<h3>{goal.title}</h3>

<p>
Weightage:
<b> {goal.weightage}%</b>
</p>

<p>
Status:
<b style={{
color:'orange'
}}>
 Pending
</b>
</p>

</div>

))}

</div>

</div>

)}



{/* ====================================== */}
{/* RECENT ACTIVITY */}
{/* ====================================== */}
<div style={{

 marginTop:'25px',

 background:'white',

 padding:'20px',

 borderRadius:'18px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Recent Activity Feed</h2>

{logs.length===0 && (

<p style={{
marginTop:'15px',
color:'#666'
}}>
No recent activity.
</p>

)}

<div style={{
marginTop:'15px'
}}>

{logs.map(log=>(

<div

key={log._id}

style={{

 borderBottom:'1px solid #ddd',

 padding:'15px 0'

}}

>

<h3>{log.action}</h3>

<p style={{
fontSize:'14px',
color:'#666'
}}>

{new Date(
log.createdAt
).toLocaleString()}

</p>

</div>

))}

</div>

</div>



{/* ====================================== */}
{/* GOAL SUMMARY */}
{/* ====================================== */}
<div style={{

 marginTop:'25px',

 background:'white',

 padding:'20px',

 borderRadius:'18px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Goal Summary</h2>

<div style={{
marginTop:'15px'
}}>

{goals.map(goal=>(

<div

key={goal._id}

style={{

 borderBottom:'1px solid #ddd',

 padding:'15px 0'

}}

>

<div style={{
display:'flex',
justifyContent:'space-between'
}}>

<h3>{goal.title}</h3>

<span style={{

 background:'#dbeafe',

 color:'#1d4ed8',

 padding:'6px 12px',

 borderRadius:'20px',

 fontSize:'13px'

}}>

{goal.weightage}%

</span>

</div>



{/* STATUS */}
<p>

Status:

<span style={{

 marginLeft:'10px',

 color:
 goal.status==='Approved'
 ? 'green'
 : goal.status==='Rejected'
 ? 'red'
 : 'orange',

 fontWeight:'bold'

}}>

{goal.status}

</span>

</p>



{/* PROGRESS */}
<div style={{

 background:'#e5e7eb',

 height:'12px',

 borderRadius:'20px',

 overflow:'hidden',

 marginTop:'10px'

}}>

<div style={{

 width:`${goal.progress}%`,

 background:
 goal.status==='Approved'
 ? '#22c55e'
 : goal.status==='Rejected'
 ? '#dc2626'
 : '#f59e0b',

 height:'100%',

 transition:'0.5s'

}}>

</div>

</div>

<p style={{
marginTop:'5px',
fontSize:'14px'
}}>
{goal.progress}% Completed
</p>

</div>

))}

</div>

</div>

</MainLayout>

);

}



// ======================================
// KPI CARD
// ======================================
function Card({ title, value }) {

return (

<div style={{

 background: 'white',

 padding: '25px',

 borderRadius: '18px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

);

}