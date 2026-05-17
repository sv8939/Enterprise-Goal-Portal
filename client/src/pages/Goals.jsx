import axios from 'axios';
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';

export default function Goals() {

const [title, setTitle] = useState('');
const [weightage, setWeightage] = useState('');

const [goals, setGoals] = useState([]);

const [loading, setLoading] = useState(false);

useEffect(() => {

 fetchGoals();

}, []);



// =====================================
// FETCH GOALS
// =====================================
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



// =====================================
// CREATE GOAL
// =====================================
const createGoal = async () => {

 if (!title || !weightage) return;

 try {

   setLoading(true);

   await axios.post(

      'https://enterprise-goal-backend.onrender.com/api/goals',

      {

         title,

         weightage

      },

      {
         headers: {
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   setTitle('');
   setWeightage('');

   fetchGoals();

 } catch (err) {

   alert(
      err.response?.data?.message ||
      'Error Creating Goal'
   );

 } finally {

   setLoading(false);

 }

};



// =====================================
// DELETE GOAL
// =====================================
const deleteGoal = async(id)=>{

 try{

   await axios.delete(

      `https://enterprise-goal-backend.onrender.com/api/goals/${id}`,

      {
         headers:{
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   fetchGoals();

 }catch(err){

   console.log(err);

 }

};



// =====================================
// APPROVE GOAL
// =====================================
const approveGoal = async(id)=>{

 try{

   await axios.put(

      `https://enterprise-goal-backend.onrender.com/api/goals/${id}/approve`,

      {},

      {
         headers:{
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   fetchGoals();

 }catch(err){

   console.log(err);

 }

};



// =====================================
// UPDATE CHECK-IN
// =====================================
const updateCheckin = async(

 id,
 quarter

)=>{

 try{

   await axios.put(

      `https://enterprise-goal-backend.onrender.com/api/goals/${id}/checkin`,

      {

         quarter,

         planned:'Planned Work',

         actual:'Actual Work',

         managerComment:'Good Progress',

         status:'Completed'

      },

      {
         headers:{
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   fetchGoals();

 }catch(err){

   console.log(err);

 }

};



return (

<MainLayout>

<h1>Goal Management</h1>



{/* ================================= */}
{/* CREATE GOAL CARD */}
{/* ================================= */}
<div style={{

 background: 'white',

 padding: '20px',

 borderRadius: '18px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Create Goal</h2>

<div style={{
display:'flex',
gap:'10px',
marginTop:'15px'
}}>

<input

placeholder='Enter Goal Title'

value={title}

onChange={(e) =>
setTitle(e.target.value)}

style={{

 padding: '12px',

 width: '60%',

 border:'1px solid #ddd',

 borderRadius:'10px'

}}

/>

<input

type='number'

placeholder='Weightage %'

value={weightage}

onChange={(e) =>
setWeightage(e.target.value)}

style={{

 padding: '12px',

 width: '20%',

 border:'1px solid #ddd',

 borderRadius:'10px'

}}

/>

<button

disabled={loading}

onClick={createGoal}

style={{

 padding: '12px',

 background: '#2563eb',

 color: 'white',

 border: 'none',

 borderRadius:'10px',

 cursor:'pointer'

}}

>

{loading ? 'Creating...' : 'Create Goal'}

</button>

</div>

</div>



{/* ================================= */}
{/* GOALS LIST */}
{/* ================================= */}
<div style={{

 background: 'white',

 padding: '20px',

 borderRadius: '18px',

 marginTop: '20px',

 boxShadow:'0 2px 10px rgba(0,0,0,0.1)'

}}>

<h2>Goals</h2>

{/* EMPTY STATE */}
{goals.length===0 && (

<div style={{

 padding:'30px',

 textAlign:'center',

 color:'#666'

}}>

No goals available.
Create your first goal.

</div>

)}



{goals.map(goal => (

<div

key={goal._id}

style={{

 padding: '20px',

 borderBottom: '1px solid #ddd',

 marginTop:'10px'

}}

>

{/* TITLE */}
<div style={{
display:'flex',
justifyContent:'space-between'
}}>

<h2>{goal.title}</h2>

<span style={{

 background:'#dbeafe',

 color:'#1d4ed8',

 padding:'8px 14px',

 borderRadius:'20px',

 fontSize:'14px'

}}>

{goal.weightage}%

</span>

</div>



{/* STATUS */}
<p>

Status:

<span style={{

 marginLeft: '10px',

 color:

 goal.status === 'Approved'

 ? 'green'

 : goal.status === 'Rejected'

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



{/* ================================= */}
{/* QUARTERLY CHECK-INS */}
{/* ================================= */}
<div style={{
marginTop:'20px'
}}>

<h3>Quarterly Check-Ins</h3>

<div style={{
display:'grid',
gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
gap:'15px',
marginTop:'15px'
}}>

{goal.quarterlyUpdates?.map(q=>(

<div

key={q.quarter}

style={{

 border:'1px solid #ddd',

 borderRadius:'12px',

 padding:'15px',

 background:'#f8fafc'

}}

>

<h4>{q.quarter}</h4>

<p>
Status:
<b> {q.status}</b>
</p>

<p>
Manager:
<b> {q.managerComment || 'No Comments'}</b>
</p>

<button

onClick={()=>
updateCheckin(
goal._id,
q.quarter
)
}

style={{

 marginTop:'10px',

 padding:'10px',

 background:'#0f766e',

 color:'white',

 border:'none',

 borderRadius:'10px',

 width:'100%'

}}

>

Submit Check-In

</button>

</div>

))}

</div>

</div>



{/* ================================= */}
{/* ACTION BUTTONS */}
{/* ================================= */}
<div style={{
display:'flex',
gap:'10px',
marginTop:'20px'
}}>

{/* APPROVE */}
{goal.status === 'Pending' && (

<button

onClick={() =>
approveGoal(goal._id)
}

style={{

 padding:'10px 16px',

 background:'#16a34a',

 color:'white',

 border:'none',

 borderRadius:'10px',

 cursor:'pointer'

}}

>

Approve

</button>

)}



{/* DELETE */}
<button

onClick={() =>
deleteGoal(goal._id)
}

style={{

 padding:'10px 16px',

 background:'#dc2626',

 color:'white',

 border:'none',

 borderRadius:'10px',

 cursor:'pointer'

}}

>

Delete

</button>

</div>

</div>

))}

</div>

</MainLayout>

);

}