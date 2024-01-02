import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import AppRoutes from "./components/AppRoutes"
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Web Forum</h1>
        <p>Find this app layout in frontend/src/App.tsx</p>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
