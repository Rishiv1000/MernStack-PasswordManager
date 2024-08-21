import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ReadUser from "./ReadUser";
import UpdateUser from "./UpdateUser";
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/management" element={<Home />} />
        <Route path="/readuser/:id" element={<ReadUser />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />'
        
       
      </Routes>
    </div>
  );
}

export default App;
