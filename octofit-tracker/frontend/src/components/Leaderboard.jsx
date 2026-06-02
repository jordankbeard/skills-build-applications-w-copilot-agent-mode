import { useState } from 'react';
import { useApi } from '../hooks/useApi';

function Leaderboard() {
  const [page, setPage] = useState(1);
  const { data: response, loading, error } = useApi(`/leaderboard?page=${page}`);

  // Handle both paginated and array responses
  const entries = Array.isArray(response) ? response : response?.data || [];
  const totalPages = !Array.isArray(response) && response?.totalPages ? response.totalPages : 1;

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏅';
    }
  };

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h2 className="mb-4">🏆 Leaderboard</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading leaderboard: {error.message}
          </div>
        )}

        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : entries && entries.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '60px' }}>Rank</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th style={{ width: '120px' }}>Score</th>
                    {entries[0]?.activities !== undefined && <th style={{ width: '120px' }}>Activities</th>}
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => (
                    <tr key={entry._id} className={idx < 3 ? `table-${['light', 'info', 'warning'][idx]}` : ''}>
                      <td className="fw-bold">
                        <span className="me-2">{getMedalEmoji(entry.rank || idx + 1)}</span>
                        {entry.rank || idx + 1}
                      </td>
                      <td className="fw-bold">{entry.username || entry.userId}</td>
                      <td>{entry.team || '—'}</td>
                      <td>
                        <strong>{entry.score}</strong>
                      </td>
                      {entry.activities !== undefined && <td>{entry.activities}</td>}
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
          <div className="alert alert-info">No leaderboard entries found.</div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
