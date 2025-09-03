// // src/pages/User/Login.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const UserLogin = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const passwordPattern =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'"\\|,.<>?/`~+\-=_]).{8,}$/;

//     if (!passwordPattern.test(formData.password)) {
//       alert(
//         '❌ Password must include at least:\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character\n- Minimum 8 characters'
//       );
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', formData);

//       // ✅ Store token, role, and user data
//       localStorage.setItem('userToken', res.data.token);
//       localStorage.setItem('role', 'user');

//       localStorage.setItem(
//         'user',
//         JSON.stringify({
//           name: res.data.name,
//           city: res.data.city,
//           email: res.data.email,
//         })
//       );

//       // ✅ Step 1: Store email separately for BookTicket
//       localStorage.setItem('userEmail', res.data.email);

//       console.log('✅ Login Success:', res.data);
//       alert('✅ Login successful! Redirecting...');
//       navigate('/user/dashboard', { replace: true });

//     } catch (err) {
//       console.error('❌ Login Error:', err.response?.data || err.message);
//       alert('❌ Login failed. Please check your email or password.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="form-card">
//         <h2>User Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'&quot;\\|,.<>?/`~+\-=_]).{8,}$"
//             title="Password must include 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters"
//           />
//           <button type="submit">Login</button>
//         </form>
//         <div className="redirect-msg">
//           Don’t have an account?{' '}
//           <span className="link-text" onClick={() => navigate('/register')}>
//             Register
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;


// src/pages/User/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import monkey from '../../assets/img/monkey.jpg'; // 👈 import your monkey image
import './Login.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'"\\|,.<>?/`~+\-=_]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      alert(
        '❌ Password must include at least:\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character\n- Minimum 8 characters'
      );
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);

      localStorage.setItem('userToken', res.data.token);
      localStorage.setItem('role', 'user');
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: res.data.name,
          city: res.data.city,
          email: res.data.email,
        })
      );
      localStorage.setItem('userEmail', res.data.email);

      alert('✅ Login successful! Redirecting...');
      navigate('/user/dashboard', { replace: true });
    } catch (err) {
      console.error('❌ Login Error:', err.response?.data || err.message);
      alert('❌ Login failed. Please check your email or password.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        {/* 👇 Monkey avatar badge */}
        <img src={monkey} alt="User" className="login-monkey" />

        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'&quot;\\|,.<>?/`~+\-=_]).{8,}$"
            title="Password must include 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters"
          />
          <button type="submit">Login</button>
        </form>

        <div className="redirect-msg">
          Don’t have an account?{' '}
          <span className="link-text" onClick={() => navigate('/register')}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
