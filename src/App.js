import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import AddClient from './Components/AddClient';
import UpdateClientStatus from './Components/UpdateClientStatus';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' Component={Dashboard} />
          <Route exact path='/addClient' Component={AddClient} />
          <Route exact path='/updateClientStatus' Component={UpdateClientStatus} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
