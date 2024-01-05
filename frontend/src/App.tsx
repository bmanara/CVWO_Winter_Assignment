import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import './App.css';
import AppRoutes from "./components/AppRoutes"
import NavBar from "./components/NavBar";
import { API_URL } from "./constants"

class App extends Component {
  constructor(props: any) {
    console.log("Structure of props:", props);
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }
  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.post(`${API_URL}/logged_in`,
              {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response);
      } else {
        this.handleLogout();
      }
    })
    .catch(error => console.log('API errors:', error))
  }

  // TODO: Do not leave data parameter as 'any' type
  handleLogin = (data: any) => {
    console.log("Structure of 'data':", data);
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
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
}

export default App
