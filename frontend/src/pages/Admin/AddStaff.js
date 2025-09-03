// import React, { useState } from 'react';
// import './AdminDashboard.css';

// const AddStaff = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleAdd = (e) => {
//     e.preventDefault();
//     // Submit data to backend here
//     console.log({ email, password });
//   };

//   return (
//     <div className="admin-container">
//       <h2>Add Staff Member</h2>
//       <form className="form" onSubmit={handleAdd}>
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="staff@nbpark.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Enter a strong password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Add Staff</button>
//       </form>
//     </div>
//   );
// };

// export default AddStaff;

import React, { useState } from "react";
import adminApi from "../../api/adminApi"; // axios instance that injects admin token

const AddStaff = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    try {
      const res = await adminApi.post("/add-staff", form);
      setMsg({ type: "success", text: res.data.message || "Staff added successfully!" });

      // Reset form
      setForm({ name: "", email: "", phone: "", password: "" });
    } catch (error) {
      setMsg({
        type: "error",
        text: error.response?.data?.message || "Failed to add staff. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={{ marginBottom: 16 }}>Add New Staff</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email (unique)"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Adding…" : "Add Staff"}
        </button>
      </form>

      {msg.text && (
        <p style={{ marginTop: 12, color: msg.type === "error" ? "red" : "green" }}>
          {msg.text}
        </p>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: 420,
    margin: "30px auto",
    padding: 20,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: 14,
  },
  button: {
    padding: "10px 12px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};

export default AddStaff;
