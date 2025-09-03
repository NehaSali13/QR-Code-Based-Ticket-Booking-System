import React, { useEffect, useState, useCallback } from 'react';
import adminApi from '../../api/adminApi';
import './ViewStaff.css';

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [limit] = useState(10);

  // ✅ memoise so eslint is happy
  const loadStaff = useCallback(async (page = 1, q = '') => {
    setLoading(true);
    try {
      const res = await adminApi.get('/view-staff', {
        params: { page, limit, search: q }
      });

      const data = res.data;

      if (Array.isArray(data)) {
        setStaff(data);
        setMeta({ total: data.length, page: 1, pages: 1 });
      } else {
        setStaff(data.data || []);
        setMeta({
          total: data.total || 0,
          page: data.page || 1,
          pages: data.pages || 1
        });
      }
    } catch (e) {
      console.error('Failed to load staff', e);
      setStaff([]);
    } finally {
      setLoading(false);
    }
  }, [limit]); // <- only changes if limit changes

  useEffect(() => {
    loadStaff(meta.page, search);
  }, [loadStaff, meta.page, search]); // ✅ include it

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setMeta((m) => ({ ...m, page: 1 }));
  };

  const prev = () =>
    setMeta((m) => ({ ...m, page: Math.max(1, m.page - 1) }));
  const next = () =>
    setMeta((m) => ({ ...m, page: Math.min(m.pages, m.page + 1) }));

  if (loading) return <p className="staff-wrapper">Loading…</p>;

  return (
    <div className="staff-wrapper">
      <h2 className="staff-title">All Staff ({meta.total || staff.length})</h2>

      <div className="staff-search">
        <input
          type="text"
          placeholder="Search by name/email/role…"
          value={search}
          onChange={onSearchChange}
        />
      </div>

      {staff.length === 0 ? (
        <p>No staff found.</p>
      ) : (
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s._id}>
                <td>{s.name || '-'}</td>
                <td>{s.email}</td>
                <td>{s.phone || '-'}</td>
                <td>{s.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {meta.pages > 1 && (
        <div className="pagination-controls">
          <button onClick={prev} disabled={meta.page === 1}>Prev</button>
          <span>Page {meta.page} of {meta.pages}</span>
          <button onClick={next} disabled={meta.page === meta.pages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default ViewStaff;
