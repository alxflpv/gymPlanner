import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import FrontPage from './components/FrontPage';
import Calender from './components/Calender';

function App() {
  return (
    
      <Router>
        <Navbar />
        <Switch>
          
          <Route path='/' exact component={FrontPage} />
          <Route path='/customerlist' component={CustomerList} />
          <Route path='/traininglist' component={TrainingList} />
          <Route path='/calender' component={Calender} />
        </Switch>
      </Router>
    
  );
}

export default App;
