import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import "../styles/Register-style.css"
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigator = useNavigate();

    function handleRegistrationForm(e){

        e.preventDefault();
    
        const register = {username, email, password}
    
        console.log(register);
    
        registerAPICall(register).then((response)=>{
            console.log(response.data);
            navigator("/login");
        }).catch(error => {
            console.error(error);
        })
        }

  return (
    <div className='container'>
    <br /><br />
    <div className='row'>
        <div className='col-md-6 offset-md-3'>
            <div className='card'
            id='register-card'>
                    <div className='card-header'
                    id='register-head'>
                        <h2 className='text-center'>Registracijos forma</h2>
                    </div>

                    <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                        <label className='col-md-3 control-label'> Vardas</label>
                                        <div className='col-md-9'>
                                            <input type='text' 
                                                    name="username"
                                                    placeholder='Įveskite Vardą'
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className='w-100'
                                                    id='register-input-1'
                                                   
                                             />
                                        </div>
                                </div>
                                <div className='row mb-3'>
                                        <label className='col-md-3 control-label'> El.paštas</label>
                                        <div className='col-md-9'>
                                            <input type='text' 
                                                    name="email"
                                                    placeholder='Įveskite El.paštą'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className='w-100'
                                                    id='register-input-2'
                                             />
                                        </div>
                                </div>
                                <div className='row mb-3'>
                                        <label className='col-md-3 control-label'> Slaptažodis</label>
                                        <div className='col-md-9'>
                                            <input type='password' 
                                                    name="password"
                                                    placeholder='Įveskite slaptažodį'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className='w-100'
                                                    id='register-input-3'
                                                    
                                             />
                                        </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' onClick={(e) => handleRegistrationForm(e)}
                                    id='register-button'>Registruotis</button>

                                </div>
                            </form>
                    </div>
            </div>
        </div>
    </div>

</div>
  )
}

export default RegisterComponent