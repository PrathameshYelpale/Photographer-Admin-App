import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard";
import AddClient from "./Components/AddClient";
import UpdateClientStatus from "./Components/UpdateClientStatus";
import Login from "./Components/Login";
import AddPackages from './Components/AddPackages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" Component={Dashboard} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/addClient" Component={AddClient} />
          <Route exact  path="/updateClientStatus/:id" Component={UpdateClientStatus}/>
          <Route exact path='/addPackages' Component={AddPackages} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
