import './App.css';
import AddGuest from './Pages/AddGuest'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import GuestList from './Pages/GuestList';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AddGuest/>}/>
            <Route path='/Registro%20Invitado' element={<AddGuest/>}/>
            <Route path='/Mesas' element={<GuestList/>}/>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
