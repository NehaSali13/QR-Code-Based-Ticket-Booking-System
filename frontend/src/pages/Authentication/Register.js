import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async e => {
    e.preventDefault();

    const { name, city, email, password, confirmPassword } = formData;

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'"\\|,.<>?/`~+\-=_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      alert(
        '❌ Password must include:\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character\n- Minimum 8 characters'
      );
      return;
    }

    if (password !== confirmPassword) {
      alert('❌ Password and Confirm Password do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        city,
        email,
        password,
      });

      alert('✅ User registered successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('❌ Server error during registration.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'&quot;\\|,.<>?/`~+\-=_]).{8,}$"
          title="Password must include 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters"
        />
        <span
          onClick={togglePassword}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <span
          onClick={toggleConfirmPassword}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          {showConfirmPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
