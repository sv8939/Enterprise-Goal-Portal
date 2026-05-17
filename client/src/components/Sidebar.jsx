import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {

const role =
localStorage.getItem('role');

const [open,setOpen] =
useState(true);



return (

<>

{/* ===================================== */}
{/* MOBILE TOGGLE */}
{/* ===================================== */}
<button

onClick={() => setOpen(!open)}

style={{

 position:'fixed',

 top:'15px',

 left:'15px',

 zIndex:'1000',

 background:'#0f172a',

 color:'white',

 border:'none',

 padding:'10px 14px',

 borderRadius:'10px',

 cursor:'pointer',

 display:'block'

}}

>

☰

</button>



{/* ===================================== */}
{/* SIDEBAR */}
{/* ===================================== */}
<div style={{

 width: open ? '260px' : '0px',

 overflow:'hidden',

 transition:'0.3s',

 background:'#0f172a',

 color:'white',

 minHeight:'100vh',

 padding: open ? '25px' : '0px',

 boxSizing:'border-box',

 position:'sticky',

 top:'0'

}}>

{/* LOGO */}
<h1 style={{
marginTop:'50px'
}}>
GoalSphere
</h1>

<p style={{
color:'#94a3b8'
}}>
Enterprise Portal
</p>



{/* ===================================== */}
{/* ROLE BADGE */}
{/* ===================================== */}
<div style={{

 marginTop:'20px',

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

 fontWeight:'bold',

 fontSize:'14px'

}}>

{role}

</div>



{/* ===================================== */}
{/* NAVIGATION */}
{/* ===================================== */}
<div style={{

 display:'flex',

 flexDirection:'column',

 gap:'15px',

 marginTop:'35px'

}}>

{/* DASHBOARD */}
<Link style={link} to='/dashboard'>
Dashboard
</Link>



{/* GOALS */}
<Link style={link} to='/goals'>
Goals
</Link>



{/* APPROVALS */}
{role !== 'Employee' && (

<Link style={link} to='/approvals'>
Approvals
</Link>

)}



{/* ANALYTICS */}
<Link style={link} to='/analytics'>
Analytics
</Link>



{/* AUDIT LOGS */}
{role === 'Admin' && (

<Link style={link} to='/audit-logs'>
Audit Logs
</Link>

)}



{/* ADMIN PANEL */}
{role === 'Admin' && (

<Link style={link} to='/admin'>
Admin Panel
</Link>

)}



{/* MANAGER REVIEW */}
{role === 'Manager' && (

<Link style={link} to='/manager-review'>
Manager Review
</Link>

)}



{/* EMPLOYEE CHECK-IN */}
{role === 'Employee' && (

<Link style={link} to='/checkins'>
Quarterly Check-Ins
</Link>

)}



{/* LOGOUT */}
<button

onClick={() => {

 localStorage.clear();

 window.location.href='/';

}}

style={{

 background:'#dc2626',

 padding:'14px',

 borderRadius:'10px',

 color:'white',

 border:'none',

 cursor:'pointer',

 textAlign:'left'

}}

>

Logout

</button>

</div>



{/* ===================================== */}
{/* FOOTER */}
{/* ===================================== */}
<div style={{
marginTop:'40px',
color:'#64748b',
fontSize:'14px'
}}>

Enterprise Goal Management System

</div>

</div>

</>

);

}



const link = {

background:'#1e293b',

padding:'14px',

borderRadius:'10px',

color:'white',

textDecoration:'none',

transition:'0.3s'

};