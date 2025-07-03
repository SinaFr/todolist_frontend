import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartComponent from './components/StartComponent';
import ListTaskComponent from './components/ListTaskComponent';
import TaskComponent from './components/TaskComponent';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegistrationComponent';
import RegistrationSuccessComponent from './components/RegistrationSuccessComponent';
import { AuthProvider } from './components/AuthContextComponent';
import ProtectedRouteComponent from './components/ProtectedRouteComponent';
import AccountComponent from './components/AccountInformationComponent';

function App() {
  return (
    <div className="app-container">
      {/* wrap the entire app with BrowserRouter */}
      <BrowserRouter>
        <AuthProvider>
          <HeaderComponent />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<StartComponent />} />
              <Route path="/signup" element={<RegistrationComponent />} />
              <Route path="/signup-success" element={<RegistrationSuccessComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/tasks" element={<ProtectedRouteComponent><ListTaskComponent /></ProtectedRouteComponent>} />
              <Route path="/add-task" element={<ProtectedRouteComponent><TaskComponent /></ProtectedRouteComponent>} />
              <Route path="/update-task/:id" element={<ProtectedRouteComponent><TaskComponent /></ProtectedRouteComponent>} />
              <Route path="/account" element={<ProtectedRouteComponent><AccountComponent /></ProtectedRouteComponent>} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
