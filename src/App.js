import {useState} from "react"
import './App.css';
import Home from './screen/Home';
import Login from './screen/Login';
import Profile from './screen/Profile';
import SalesMan from './screen/SalesMan';
import Toadd from './screen/Toadd';
import CreateProduct from './component/CreateProduct';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {StateHandler} from "./Context/StoreContext";
import SideBar from './component/SideBar';
import BackDrop from "./component/BackDrop";


function App() {

  const [toggle, setToggle] = useState(false)
  console.log(toggle)

  const {user, dispatch} = StateHandler()
  console.log(user)

  return (
    <Router>
      <main className="App">
        <SideBar click={()=>setToggle(false)} show={toggle}/>
        <BackDrop click={()=>setToggle(false)} show={toggle}/>
        <Routes>
          <Route  exact path="/" element={user ? <Home click={()=>setToggle(true)}/>:<Login click={()=>setToggle(true)} />}/>
          <Route   path="/Login" element={!user ? <Login click={()=>setToggle(true)} /> : <Home click={()=>setToggle(true)}/> }/>
          <Route  path="/Profile" element={!user ? <Login click={()=>setToggle(true)}/> : <Profile click={()=>setToggle(true)}/>}/>
          <Route  path="/SalesMan" element={<SalesMan click={()=>setToggle(true)}/>}/>
          <Route  path="/Toadd" element={<Toadd click={()=>setToggle(true)}/>} />
          <Route  path="/profile/:id" element={<Profile click={()=>setToggle(true)}/>} />
          <Route  path="/createProduct" element={<CreateProduct click={()=>setToggle(true)}/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
