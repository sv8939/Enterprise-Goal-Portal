
import axios from 'axios';
import {useEffect,useState} from 'react';
import MainLayout from '../layouts/MainLayout';

export default function AuditLogs(){

const [logs,setLogs]=useState([]);

useEffect(()=>{
fetchLogs();
},[]);

const fetchLogs=async()=>{
const res=await axios.get(
'http://localhost:5000/api/goals/audit/logs',
{
headers:{
authorization:localStorage.getItem('token')
}
}
);

setLogs(res.data);
};

return(
<MainLayout>

<h1>Audit Timeline</h1>

<div style={{
display:'flex',
flexDirection:'column',
gap:'20px',
marginTop:'20px'
}}>

{logs.map(log=>(
<div
key={log._id}
style={{
background:'white',
padding:'20px',
borderRadius:'18px',
borderLeft:'5px solid #2563eb'
}}
>

<h3>{log.action}</h3>

<p>
{new Date(log.createdAt).toLocaleString()}
</p>

</div>
))}

</div>

</MainLayout>
)}
