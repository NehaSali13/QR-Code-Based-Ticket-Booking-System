// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StaffLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleStaffLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/staff/login", {
//         email,
//         password,
//       });

//       if (res.data.token) {
//         localStorage.setItem('staffToken', res.data.token);
//         localStorage.setItem('role', 'staff'); // ✅ Important!
//         alert("✅ Staff login successful!");
//         navigate('/staff/dashboard');
//       } else {
//         alert("❌ Access denied. Not a staff member.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("❌ Login failed. Please check credentials.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="form-card">
//         <h2>Staff Login</h2>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Staff Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button onClick={handleStaffLogin}>Login</button>
//       </div>
//     </div>
//   );
// };

// export default StaffLogin;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import monkeyImg from '../../assets/img/monkey.jpg'; // ✅ Make sure this path is correct
import './StaffLogin.css'; // ✅ Create this CSS file

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleStaffLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/staff/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('staffToken', res.data.token);
        localStorage.setItem('role', 'staff');
        alert("✅ Staff login successful!");
        navigate('/staff/dashboard');
      } else {
        alert("❌ Access denied. Not a staff member.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Login failed. Please check credentials.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <img src={monkeyImg} alt="Monkey" className="login-monkey" />
        <h2>Staff Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Staff Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleStaffLogin}>Login</button>
      </div>
    </div>
  );
};

export default StaffLogin;
