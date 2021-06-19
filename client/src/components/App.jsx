import React, { useEffect, useState } from 'react';
import Login from './Login.jsx';
import Deals from './Deals.jsx';
import Registration from './Registration.jsx';
import Admin from './Admin.jsx';
import Home from './Home.jsx';
import Create from './Create.jsx';
import Gift from '../../../files/gift.gif';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const App = () => {

    const [page, setPage] = useState('home');
    const [user, setUser] = useState('customer');
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [readyToRender, setReadyToRender] = useState(false);
    const [demo, setDemo] = useState([]);

    const checkToken = () => {

        if(!token) {

            changeUser('unknown');

            if (page !== 'home') {

                changePage('login');
            }
        } else {

            changePage('deals')
        }
    }

    useEffect(() => {

        // ------------------------------------------
        // TOKEN checker (true -> show deals; false -> send to login page)
        // ------------------------------------------
        Promise.resolve(

            checkToken()
        ).then(() => {

            setReadyToRender(true);
        })
    }, [token])

    // ------------------------------------------
    // Custom functions
    // ------------------------------------------
    const changePage = (option) => { setPage(option); }
    const changeUser = (option) => { setUser(option); }
    const logOut = () => {

        setToken('')
        setPage('login')
        sessionStorage.clear('token');
    }

    const forgotPassword = () => { alert('Work in progress') }
    const welcomeHeader = () => {

        let welcomeMessage = [
            (<span class='headerSpan'>Welcome {token}!</span>),
            (<Button variant="outline-info" onClick={() => logOut()}>Log out</Button>)
        ]

        if(!token) {

            return([<Button variant="outline-info" onClick={() => changePage('login')}>Login</Button>]);
        } else {

            return welcomeMessage;
        }
    }

    const triggerLogin = (res, user, level) => {

        if (res) {

            Promise.resolve(sessionStorage.setItem('token', user))
            .then(() => setReadyToRender(false))
            .then(() => changePage('deals'))
            .then(() => changeUser(level))
            .then(() => setToken(sessionStorage.getItem('token')))
            .then(() => welcomeHeader())
            .then(() => returnRender())
            .then(() => setReadyToRender(true))
        } else {

            alert('User not found!')
        }
    }

    const triggerDemo = () => {

        if (demo.length !== 0) {

            setDemo([])
        } else {
            Promise.resolve(setDemo([

                (<span class='demoSpan'>(Demo) User selector:</span>),
                (<button onClick={() => changeUser('customer')}>Customer</button>),
                (<button onClick={() => changeUser('bpartner')}>Business Partner</button>),
                (<button onClick={() => changeUser('admin')}>Admin</button>),
            ]))
            .then(() => renderView())
        }
    }

    // ------------------------------------------
    // Page rendering
    // ------------------------------------------
    const renderView = () => {

        // ------------------------------------------
        // Default header
        // ------------------------------------------
        var addHeader = [];

        if (user === 'bpartner') {

            addHeader = [(<Nav.Link href="#" onClick={() => changePage('create')}>Create Deal</Nav.Link>)]
        } else if (user === 'admin') {

            addHeader = [(<Nav.Link href="#" onClick={() => changePage('create')}>Create Deal</Nav.Link>), (<Nav.Link href="#" onClick={() => changePage('admin')}>Admin</Nav.Link>)]
        }

        if (page === 'login') {

            var pageHeader = [

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">{'< AmazingDeals! />'}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#" onClick={() => changePage('home')}>Home</Nav.Link>
                        {addHeader}
                        <Nav.Link href="#" onClick={() => triggerDemo() }>Show/Hide Demo</Nav.Link>
                    </Nav>

                    <Form>
                        { welcomeHeader() }
                    </Form>
                </Navbar>
            ];
        } else {

            var pageHeader = [

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">{'< AmazingDeals! />'}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#" onClick={() => changePage('home')}>Home</Nav.Link>
                        <Nav.Link href="#" onClick={() => changePage('deals')}>Deals</Nav.Link>
                        {addHeader}
                        <Nav.Link href="#" onClick={() => triggerDemo() }>Show/Hide Demo</Nav.Link>
                    </Nav>

                    <Form>
                        { welcomeHeader() }
                    </Form>
                </Navbar>
            ];
        }

        // ------------------------------------------
        // Changing header based on type of user
        // ------------------------------------------

        // ------------------------------------------
        // Page selection
        // ------------------------------------------
        if (page === 'login') {

            return(
                <div>
                    <div>{pageHeader}</div>
                    <div class='divLogin'>

                        <div>
                            <Login
                                renderClick={ (res, user, level) => { triggerLogin(res, user, level) } }
                                renderSignUp={ () => changePage('registration') }
                                forgotPassword={ () => forgotPassword() }
                            />
                        </div>
                    </div>
                </div>
            )

        } else if (page === 'deals') {

            return(
                <div>
                    <div>{pageHeader}</div>
                    <Deals />
                </div>
            )

        } else if (page === 'registration') {

            return(
                <div>
                    <div>{pageHeader}</div>
                    <div class='divLogin'>
                        <Registration triggerRegistration={ () => logOut() } />
                    </div>
                </div>
            )
        } else if (page === 'admin') {

            return(
                <div>
                    <div>{pageHeader}</div>
                    <Admin />
                </div>
            )
        } else if (page === 'create') {

            return(
                <div>
                    <div>{pageHeader}</div>
                    <Create />
                </div>
            )
        } else if (page === 'login') {

            return(
                <div>
                    <div>{pageHeader}</div>
                    <Login />
                </div>
            )
        } else {

            return(
                <div>
                    <Home triggerRegistration={ () => logOut() }/>
                </div>
            )
        }
    }

    // ------------------------------------------
    // Page return
    // ------------------------------------------

    var renderDemo = (demo.length === 0) ? (<div></div>) : (<div><br></br>{ demo }</div>);
    var renderCharacter = (page === 'home') ? (<div></div>) : (<div><img class='giftImage' src={Gift}></img></div>)

    const returnRender = () => {

        return(

            readyToRender ? (
                <div>
                    {renderDemo}
                    {renderCharacter}
                    <div>
                        { renderView() }
                    </div>
                </div>

            ) : (<div></div>)
        )
    }

    return returnRender()
}

export default App;
