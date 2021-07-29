import { useContext } from 'react';
import './app.css'

import {Route,Switch} from 'react-router-dom'

import Nav from './components/Nav'

// Pages
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import Pricing from './pages/Pricing'
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Links from './pages/Links';

import {UserContext} from './utils/GetUser'


function App() {

    const {user} = useContext(UserContext)

        return (
            <>
                <Switch>
                    <Route path="/" exact>
                        <Nav user={user}></Nav>
                        <Home/>
                    </Route>

                    <Route path="/statistics" exact>
                        <Nav user={user}></Nav>
                        <Statistics/>
                    </Route>

                    <Route path="/pricing" exact>
                        <Nav user={user}></Nav>
                        <Pricing/>
                    </Route>

                    <Route path="/links" exact>
                        <Nav user={user}></Nav>
                        <Links user={user}></Links>
                    </Route>

                    <Route path="/auth" exact><Auth/></Route>
                    <Route path="/auth/login" exact><Login/></Route>
                    <Route path="/auth/register" exact><Register/></Route>

                </Switch>  
                

                
            </>
        );

}

export default App;
