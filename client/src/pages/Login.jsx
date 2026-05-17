
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(){

const navigate=useNavigate();

const [form,setForm]=useState({
email:'admin@test.com',
password:'123456'
});

const login=async()=>{
try{
const res=await axios.post(
'https://enterprise-goal-backend.onrender.com/api/auth/login',
form
);

localStorage.setItem('token',res.data.token);

navigate('/dashboard');
}catch{
alert('Invalid credentials');
}
};

return(
<div style={{
minHeight:'100vh',
display:'flex',
justifyContent:'center',
alignItems:'center',
background:'linear-gradient(to right,#0f172a,#1e293b)'
}}>

<div style={{
background:'white',
padding:'45px',
borderRadius:'18px',
width:'400px'
}}>

<h1>Enterprise Login</h1>

<input
placeholder='Email'
value={form.email}
onChange={(e)=>setForm({...form,email:e.target.value})}
style={input}
/>

<input
type='password'
placeholder='Password'
value={form.password}
onChange={(e)=>setForm({...form,password:e.target.value})}
style={input}
/>

<button style={btn} onClick={login}>
Login
</button>

</div>
</div>
)}

const input={
width:'100%',
padding:'14px',
marginTop:'14px',
boxSizing:'border-box'
};

const btn={
width:'100%',
padding:'14px',
marginTop:'20px',
background:'#2563eb',
color:'white',
border:'none'
};
