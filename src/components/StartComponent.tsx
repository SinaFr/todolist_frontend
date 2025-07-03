import { Link } from 'react-router-dom';
import { useAuth } from './AuthContextComponent';


const StartComponent = () => {
    const { isAuthenticated } = useAuth();

    return (
      <div className='startpage-container'>
          <div className='text-container'>
              <h1>Welcome to your Todo List!</h1>
              <p>
                  On this website you can manage your todos. You can create and edit tasks and you can sort them and mark them as done.
              </p>
              {isAuthenticated ? (
                  <p> You can view, add or edit your tasks <Link to="/tasks">here</Link>. <br />
                      Or you can view and edit your account information <Link to="/account">here</Link>.
                  </p>
              ) : (
                  <p> If you have no account yet, you can register <Link to="/signup">here</Link>. <br/>
                      If you already have an account, you can login <Link to="/login">here</Link>.
                  </p>
              )}
          </div>
          <div>
              <img src="/todolistIcon.jpg" className="startpage-image" alt="Todo List Icon" />
          </div>
      </div>
    );
  }
  
  export default StartComponent