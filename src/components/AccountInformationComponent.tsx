import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccount, updateAccount, deleteAccount } from '../services/AccountService';
import { useAuth } from './AuthContextComponent';

interface Account {
  id: string;
  username: string;
  name: string;
  password: string
}

export default function AccountInformation() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [account, setAccount] = useState<Account>({ id: '0', username: '', name: '', password: ''});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /* account information is loaded */
  useEffect(() => {
    getAccount()
      .then((res) => {
        setAccount(res.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage('Error loading account information');
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await updateAccount(account.id, account);
      setSuccessMessage('Account updated successfully.');
    } catch (error: any) {
      const status = error?.response?.status;
      /* 409 or 401 error mean username is already taken, otherwise throw general error */
      if (status === 409 || status === 401) {
        setErrorMessage('Username is already taken.');
      } else {
        setErrorMessage('Error updating account.');
      }
    }
  };

  const handleDelete = useCallback(async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete your account? Your tasks will be lost.'
    );
    if (!confirm) return;

    try {
      await deleteAccount(account.id);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Account deletion failed:', error);
      setErrorMessage('Failed to delete account.');
    }
  }, [account.id, logout, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Account Information</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:&nbsp;</label>
          <input
            name="name"
            value={account.name}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Username:&nbsp;</label>
          <input
            name="username"
            value={account.username}
            onChange={handleChange}
          />
        </div>

        {successMessage && (
          <p style={{ color: 'green', marginTop: '4px' }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '4px' }}>{errorMessage}</p>
        )}

        <br />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>

      <br />
      <button onClick={handleDelete} className="btn btn-danger">
        <i className="fas fa-trash"></i> Delete Account
      </button>
    </div>
  );
}
