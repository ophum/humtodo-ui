import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Project from './pages/Project';
import SignInOrSignUp from './pages/SignInOrSignUp';
import Client from './client/client';
import ProjectList from './pages/ProjectList';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const initialState = {
  token: '',
  client: new Client(baseURL),
};
export const { useGlobalState } = createGlobalState(initialState);

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={SignInOrSignUp} />
        <Route exact path="/projects/:id" component={Project} />
        <Route exact path="/projects" component={ProjectList} />
      </Router>
    </div>
  );
}

export default App;
