import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from "./components/Dashboard/Dashboard";
import Chat from "./components/Chat/Chat";

const App = () => (
    <Router >
        <Route path={'/'} exact component={Dashboard}/>
        <Route path={'/chat'}  component={Chat}/>
    </Router>

);


export default App;
