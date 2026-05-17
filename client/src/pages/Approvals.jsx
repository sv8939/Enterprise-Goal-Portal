import axios from 'axios';
import { useEffect, useState } from 'react';

import MainLayout from '../layouts/MainLayout';

export default function Approvals() {

const [goals, setGoals] =
useState([]);

const [loading, setLoading] =
useState(false);

const role =
localStorage.getItem('role');



useEffect(() => {

 fetchGoals();

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

   setGoals(

      res.data.filter(
         g => g.status === 'Pending'
      )

   );

 } catch (err) {

   console.log(err);

 }

};



// ======================================
// APPROVE GOAL
// ======================================
const approveGoal = async (id) => {

 try {

   setLoading(true);

   await axios.put(

      `https://enterprise-goal-backend.onrender.com/api/goals/${id}/approve`,

      {},

      {
         headers: {
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   fetchGoals();

 } catch (err) {

   console.log(err);

   alert(
      err.response?.data?.message
   );

 } finally {

   setLoading(false);

 }

};



// ======================================
// REJECT GOAL
// ======================================
const rejectGoal = async (id) => {

 try {

   setLoading(true);

   await axios.put(

      `https://enterprise-goal-backend.onrender.com/api/goals/${id}/reject`,

      {},

      {
         headers: {
            authorization:
            localStorage.getItem('token')
         }
      }

   );

   fetchGoals();

 } catch (err) {

   console.log(err);

   alert(
      err.response?.data?.message
   );

 } finally {

   setLoading(false);

 }

};



return (

<MainLayout>

<h1>Manager Approvals</h1>



{/* ACCESS CONTROL */}
{role === 'employee' ? (

<div style={{

 background:'white',

 padding:'25px',

 borderRadius:'18px',

 marginTop:'20px',

 textAlign:'center'

}}>

<h2>Access Restricted</h2>

<p>
Only Managers and Admins
can approve goals.
</p>

</div>

) : (

<>

{/* EMPTY STATE */}
{goals.length === 0 && (

<div style={{

 background:'white',

 padding:'30px',

 borderRadius:'18px',

 marginTop:'20px',

 textAlign:'center',

 color:'#666'

}}>

No pending approvals.

</div>

)}



<div style={{

 display:'flex',

 flexDirection:'column',

 gap:'20px',

 marginTop:'20px'

}}>

{goals.map(goal => (

<div

key={goal._id}

style={{

 background:'white',

 padding:'25px',

 borderRadius:'18px'

}}

>

<h2>{goal.title}</h2>

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



<div style={{
display:'flex',
gap:'15px',
marginTop:'20px'
}}>

<button

disabled={loading}

onClick={() =>
approveGoal(goal._id)
}

style={{

 background:'#16a34a',

 color:'white',

 padding:'12px 20px',

 border:'none',

 borderRadius:'10px',

 cursor:'pointer'

}}

>

Approve

</button>



<button

disabled={loading}

onClick={() =>
rejectGoal(goal._id)
}

style={{

 background:'#dc2626',

 color:'white',

 padding:'12px 20px',

 border:'none',

 borderRadius:'10px',

 cursor:'pointer'

}}

>

Reject

</button>

</div>

</div>

))}

</div>

</>

)}

</MainLayout>

);

}