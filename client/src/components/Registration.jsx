import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Registration = (props) => {

    const [readyToRender, setReadyToRender] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('customer');

    const changeFirstName = () => { setFirstName(event.target.value) }
    const changeLastName = () => { setLastName(event.target.value) }
    const changeEmail = () => { setEmail(event.target.value) }
    const changePassword = () => { setPassword(event.target.value) }
    const changeType = () => { setType(event.target.value) }

    const submitUser = () => {

        if (firstName !== '' && lastName !== '' && email !== '' && password !== '') {


            var trueType = ''

            if        (type === 'Customer') { trueType = 'customer'
            } else if (type === 'Admin') {    trueType = 'admin'
            } else {                          trueType = 'bpartner'
            }

            axios({ method: 'post', url: '/users',

                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userPassword: password,
                    userType: trueType,
                }
            })
            .then(() => alert('Registration success!'))
            .then(() => props.triggerRegistration())
        } else {

            alert('Please fill in all information')
        }
    }

    let returnRender = readyToRender ? (

        <div>
            <div class="divLeft">
                <form class='floatRegister'>
                    <p>First Name:</p>
                    <input type='text' value={firstName} onChange={changeFirstName}></input>

                    <p>Last Name:</p>
                    <input type='text' value={lastName} onChange={changeLastName}></input>

                    <p>E-Mail (Username):</p>
                    <input type='text' value={email} onChange={changeEmail}></input>

                    <p>Password:</p>
                    <input type='password' value={password} onChange={changePassword}></input>

                    <p>User type:</p>
                    <select value={type} onChange={changeType}>
                        {['Customer', 'Partner', 'Admin'].map((item) => (<option value={item}>{item}</option>))}
                    </select>
                </form>
            </div>
            <div class="divRight">
                <br></br><br></br><br></br><br></br><br></br><br></br>
                <button onClick={submitUser}>Submit Registration</button>
            </div>
        </div>
    ) : (<div>Loading...</div>);

    return returnRender
}

export default Registration;
