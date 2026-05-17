
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Analytics from './pages/Analytics';
import Approvals from './pages/Approvals';
import AuditLogs from './pages/AuditLogs';

export default function App(){
return(
<BrowserRouter>
<Routes>
<Route path='/' element={<Login/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/goals' element={<Goals/>}/>
<Route path='/analytics' element={<Analytics/>}/>
<Route path='/approvals' element={<Approvals/>}/>
<Route path='/audit-logs' element={<AuditLogs/>}/>
</Routes>
</BrowserRouter>
)}
