import { useState } from "react"
import {useNavigate } from 'react-router-dom'
import { checkUsernameAvailability, createAccount } from "../services/AccountService"

const RegistrationComponent = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState<Record<string, string>>({});

    const navigator = useNavigate();

    const saveAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (validateForm()) {
          const account = { name, username, password, confirmPassword };
          console.log(account);
    
          try {
            /* call to check if the username is already in use */
            const usernameAvailable = await checkUsernameAvailability(username); 
            if (!usernameAvailable) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                usernameTaken: 'Username is already taken',
              }));
              /* stop the registration process if the username is taken */
              return; 
            }
    
            /* if username is available, proceed with creating the account */
            await createAccount(account);
            navigator('/signup-success');
          } catch (error) {
            console.error('Error during registration:', error);
          }
        }
      };

      /* check is fields are filled correctly */
      function validateForm(): boolean {
        const newErrors: Record<string, string> = {};
      
        if (!name.trim()) newErrors.name = 'Required field';
        if (!username.trim()) newErrors.username = 'Required field';
        if (!password.trim()) newErrors.password = 'Required field';
        if (!confirmPassword.trim()) {
          newErrors.confirmPassword = 'Required field';
        } else if (password !== confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }

  return (
    <div className='container'> 
        <div className='row'>
            <div className='card col-md-5 offset-md-3 offset-md-3'>
                <h2 className='text-center'>SignUp</h2>
                <div className='card-body'>
                    <form onSubmit={saveAccount}>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Name</label>
                            <input
                                type='text'
                                placeholder='Enter your name'
                                name='name'
                                value={name}
                                className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </input>
                            { errors.name && <div className='invalid-feedback'> { errors.name} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Username</label>
                            <input
                                type='text'
                                placeholder='Enter your username'
                                name='username'
                                value={username}
                                className={`form-control ${errors.username || errors.usernameTaken ? 'is-invalid' : ''}`}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setErrors(prev => ({ ...prev, usernameTaken: '' }));
                                }}
                            >
                            </input>
                            { errors.username && <div className='invalid-feedback'> { errors.username} </div>}
                            { errors.usernameTaken && <div className='invalid-feedback'> { errors.usernameTaken} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Password</label>
                            <input
                                type='password'
                                placeholder='Enter a password'
                                name='password'
                                value={password}
                                className={`form-control ${ errors.password ? 'is-invalid': ''}`}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </input>
                            { errors.password && <div className='invalid-feedback'> { errors.password} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Confirm password</label>
                            <input
                                type='password'
                                placeholder='Enter the password again'
                                name='confirmPassword'
                                value={confirmPassword}
                                className={`form-control ${ errors.confirmPassword ? 'is-invalid': ''}`}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </input>
                            { errors.confirmPassword && <div className='invalid-feedback'> { errors.confirmPassword} </div>}
                        </div>

                        <button className='btn btn-primary'>Register</button>
                    </form>
                </div>
            </div>
        </div>
         
    </div>
  )
}

export default RegistrationComponent