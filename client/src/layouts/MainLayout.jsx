
import Sidebar from '../components/Sidebar';

export default function MainLayout({children}){
return(
<div style={{display:'flex'}}>
<Sidebar/>

<div style={{
flex:1,
padding:'30px'
}}>
{children}
</div>

</div>
)}
