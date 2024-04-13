import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Employeeform from './components/Employeeform';
import Main from './components/Main';
import PrivateRoutes from './components/PrivateRoutes';


function App() {
  return (
    <div>
      <div>
      <Routes>
        <Route path={'/'} element={<Login/>}></Route>
        <Route element = {<PrivateRoutes />}>
        <Route path={'/home'} element={<Main child={<Home/>}/>}></Route>
        <Route path={'/add'} element={<Main child={<Employeeform/>}/>}></Route>
        </Route>
      </Routes>
    </div>
    </div>
  );
}

export default App;
