import { useState } from 'react';
import { useApi } from '../hooks/useApi';

function Users() {
  const [page, setPage] = useState(1);
  const { data: response, loading, error } = useApi(`/users?page=${page}`);

  // Handle both paginated and array responses
  const users = Array.isArray(response) ? response : response?.data || [];
  const totalPages = !Array.isArray(response) && response?.totalPages ? response.totalPages : 1;

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h2 className="mb-4">👥 Users</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading users: {error.message}
          </div>
        )}

        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : users && users.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Team</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="fw-bold">{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.team || 'No team'}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setPage(p)}>
                        {p}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <div className="alert alert-info">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default Users;
