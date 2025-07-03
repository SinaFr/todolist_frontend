import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContextComponent";

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /* get login function from AuthContext */
  const { login } = useAuth(); 

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login(username, password);
      /* after login navigate to start page */
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login not successful. Please try again!';
      setError(errorMessage);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-5 offset-md-3'>
          <h2 className='text-center'>Login</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Username</label>
                <input
                  type='text'
                  placeholder='Enter your username'
                  name='username'
                  value={username}
                  className='form-control'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Password</label>
                <input
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  value={password}
                  className='form-control'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* show error message */}
              {error && <div style={{ display: 'block', color: 'red' }}>{error}</div>}

              <br />
              <button className='btn btn-primary' onClick={handleLogin}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
