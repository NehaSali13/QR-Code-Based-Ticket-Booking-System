// import React, { useEffect, useState } from 'react';
// import adminApi from '../../api/adminApi'; // or use axios
// import './ViewUsers.css';


// const ViewUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const response = await adminApi.get('/view-users'); // API call
//         const data = response.data;

//         // Handle paginated response OR array response
//         if (Array.isArray(data)) {
//           setUsers(data);
//           setMeta({ total: data.length, page: 1, pages: 1 });
//         } else {
//           setUsers(data.data || []);
//           setMeta({
//             total: data.total || 0,
//             page: data.page || 1,
//             pages: data.pages || 1,
//           });
//         }
//       } catch (e) {
//         console.error('Failed to load users', e);
//         setUsers([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   if (loading) return <p>Loading…</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>All Users ({meta.total || users.length})</h2>

//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>City</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u._id}>
//                 <td>{u.name}</td>
//                 <td>{u.city}</td>
//                 <td>{u.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {meta.pages > 1 && (
//         <p style={{ marginTop: '10px' }}>
//           Page {meta.page} of {meta.pages}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ViewUsers;


import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await adminApi.get('/view-users');
        const data = response.data;

        if (Array.isArray(data)) {
          setUsers(data);
          setMeta({ total: data.length, page: 1, pages: 1 });
        } else {
          setUsers(data.data || []);
          setMeta({
            total: data.total || 0,
            page: data.page || 1,
            pages: data.pages || 1,
          });
        }
      } catch (e) {
        console.error('Failed to load users', e);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="users-meta">Loading…</p>;

  return (
    <div className="users-wrapper">
      <h2 className="users-title">All Users ({meta.total || users.length})</h2>

      {users.length === 0 ? (
        <p className="empty-state">No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td data-label="Name">{u.name}</td>
                <td data-label="City">{u.city}</td>
                <td data-label="Email">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {meta.pages > 1 && (
        <p className="users-meta" style={{ marginTop: 10 }}>
          Page {meta.page} of {meta.pages}
        </p>
      )}
    </div>
  );
};

export default ViewUsers;
