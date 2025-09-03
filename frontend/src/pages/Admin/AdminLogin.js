// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import monkey from '../../assets/img/monkey.jpg';  // <-- import the monkey image
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await axios.post('http://localhost:5000/api/admins/login', {
//         email,
//         password,
//       });

//       const { token, email: adminEmail } = res.data;

//       localStorage.setItem('adminToken', token);
//       localStorage.setItem('admin_token', token);
//       localStorage.setItem('role', 'admin');
//       localStorage.setItem('adminEmail', adminEmail);

//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       navigate('/admin/dashboard', { replace: true });
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Login failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* Monkey Image */}
//       <img src={monkey} alt="Monkey" className="login-monkey" />

//       <div className="login-box">
//         <h2>Admin Login</h2>
//         <form onSubmit={handleLogin}>
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? 'Logging in…' : 'Login'}
//           </button>
//           {error && <p className="error-msg">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import monkey from '../../assets/img/monkey.jpg';   // 👈 import your monkey
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/admins/login', {
        email,
        password
      });

      const { token, email: adminEmail } = res.data;

      localStorage.setItem('adminToken', token);
      localStorage.setItem('admin_token', token);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('adminEmail', adminEmail);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* 👇 Monkey badge */}
        <img src={monkey} alt="Admin" className="admin-login-avatar" />

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
