import './App.css';
import Home from "./page/Home.js"
import {Admin} from './page/admin'
import SignInScreen from "./page/LoginForm.js"
import Register from './page/register';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/admin" element={<Admin />}/>
              <Route path="/" element={<SignInScreen />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/home" element={<Home />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
