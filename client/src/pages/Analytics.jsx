import axios from 'axios';
import { useEffect, useState } from 'react';

import MainLayout from '../layouts/MainLayout';

import {

 PieChart,
 Pie,
 Cell,
 Tooltip,
 ResponsiveContainer,
 Legend,
 BarChart,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid

} from 'recharts';



export default function Analytics() {

const [goals, setGoals] =
useState([]);

const [chartData, setChartData] =
useState([]);

const [barData, setBarData] =
useState([]);

const [completion, setCompletion] =
useState(0);



useEffect(() => {

 fetchData();

}, []);



// ========================================
// FETCH DATA
// ========================================
const fetchData = async () => {

 try {

   const res = await axios.get(

      'http://localhost:5000/api/goals',

      {
         headers: {
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   const goalsData = res.data;

   setGoals(goalsData);

   // STATUS COUNTS
   const approved =
   goalsData.filter(
      g => g.status === 'Approved'
   ).length;

   const pending =
   goalsData.filter(
      g => g.status === 'Pending'
   ).length;

   const rejected =
   goalsData.filter(
      g => g.status === 'Rejected'
   ).length;

   // PIE CHART
   setChartData([

      {
         name:'Approved',
         value:approved
      },

      {
         name:'Pending',
         value:pending
      },

      {
         name:'Rejected',
         value:rejected
      }

   ]);

   // COMPLETION %
   const total = goalsData.length;

   const complete =
   total === 0
   ? 0
   : Math.round(
      (approved / total) * 100
   );

   setCompletion(complete);

   // BAR CHART
   setBarData(

      goalsData.map(goal => ({

         name:
         goal.title.length > 12
         ? goal.title.substring(0,12)+'...'
         : goal.title,

         progress:goal.progress,

         weightage:goal.weightage

      }))

   );

 } catch (err) {

   console.log(err);

 }

};



return (

<MainLayout>

<h1>Analytics Dashboard</h1>



{/* ======================================== */}
{/* KPI CARDS */}
{/* ======================================== */}
<div style={{

 display:'grid',

 gridTemplateColumns:
 'repeat(auto-fit,minmax(220px,1fr))',

 gap:'20px',

 marginTop:'25px'

}}>

<Card
title='Total Goals'
value={goals.length}
/>

<Card
title='Completion Rate'
value={`${completion}%`}
/>

<Card
title='Approved Goals'
value={
goals.filter(
g=>g.status==='Approved'
).length
}
/>

<Card
title='Pending Goals'
value={
goals.filter(
g=>g.status==='Pending'
).length
}
/>

</div>



{/* ======================================== */}
{/* PIE CHART */}
{/* ======================================== */}
<div style={{

 background:'white',

 padding:'20px',

 borderRadius:'18px',

 marginTop:'25px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Goal Status Distribution</h2>

<ResponsiveContainer
width='100%'
height={400}
>

<PieChart>

<Pie

data={chartData}

dataKey='value'

outerRadius={140}

label

>

{chartData.map((entry,index)=>(

<Cell

key={index}

fill={
index===0
? '#22c55e'
: index===1
? '#f59e0b'
: '#dc2626'
}

/>

))}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>



{/* ======================================== */}
{/* BAR CHART */}
{/* ======================================== */}
<div style={{

 background:'white',

 padding:'20px',

 borderRadius:'18px',

 marginTop:'25px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Goal Progress Analytics</h2>

<ResponsiveContainer
width='100%'
height={400}
>

<BarChart data={barData}>

<CartesianGrid strokeDasharray='3 3'/>

<XAxis dataKey='name'/>

<YAxis/>

<Tooltip/>

<Legend/>

<Bar
dataKey='progress'
fill='#2563eb'
/>

<Bar
dataKey='weightage'
fill='#22c55e'
/>

</BarChart>

</ResponsiveContainer>

</div>



{/* ======================================== */}
{/* COMPLETION SUMMARY */}
{/* ======================================== */}
<div style={{

 background:'white',

 padding:'20px',

 borderRadius:'18px',

 marginTop:'25px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Performance Summary</h2>

<div style={{
marginTop:'20px'
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



{/* PROGRESS BAR */}
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



// ========================================
// KPI CARD
// ========================================
function Card({ title, value }) {

return (

<div style={{

 background:'white',

 padding:'25px',

 borderRadius:'18px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

);

}