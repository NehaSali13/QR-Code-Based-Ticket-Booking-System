// src/pages/Admin/ViewBookings.js
import React, { useEffect, useState, useCallback } from 'react';
import adminApi from '../../api/adminApi'; // axios instance with adminToken
import './ViewBookings.css';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [limit] = useState(10);

  // Fetch bookings (memoised to satisfy eslint)
  const loadBookings = useCallback(async (page = 1, q = '') => {
    setLoading(true);
    try {
      const res = await adminApi.get('/view-bookings', {
        params: { page, limit, search: q },
      });

      const data = res.data;

      if (Array.isArray(data)) {
        setBookings(data);
        setMeta({ total: data.length, page: 1, pages: 1 });
      } else {
        setBookings(data.data || []);
        setMeta({
          total: data.total || 0,
          page: data.page || 1,
          pages: data.pages || 1,
        });
      }
    } catch (e) {
      console.error('❌ Failed to load bookings:', e);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadBookings(meta.page, search);
  }, [loadBookings, meta.page, search]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setMeta((m) => ({ ...m, page: 1 }));
  };

  const prev = () => setMeta((m) => ({ ...m, page: Math.max(1, m.page - 1) }));
  const next = () => setMeta((m) => ({ ...m, page: Math.min(m.pages, m.page + 1) }));

  if (loading) return <p className="bookings-wrapper">Loading…</p>;

  return (
    <div className="bookings-wrapper">
      <h2 className="bookings-title">Booking Overview ({meta.total || bookings.length})</h2>

      <div className="bookings-search">
        <input
          type="text"
          placeholder="Search by visitor name or email..."
          value={search}
          onChange={onSearchChange}
        />
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Visitor Name</th>
              <th>Email</th>
              <th>Visit Date</th>
              <th>Total Amount</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b._id}</td>
                <td>{b.name}</td>
                <td>{b.userEmail}</td>
                <td>{new Date(b.visitDate).toLocaleDateString('en-GB')}</td>
                <td>₹{b.totalAmount}</td>
                <td>{b.paymentMethod} ({b.paymentStatus})</td>
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

export default ViewBookings;
