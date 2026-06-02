import { useState } from 'react';
import { useApi } from '../hooks/useApi';

interface Team {
  _id: string;
  name: string;
  members: string[];
  score?: number;
  description?: string;
  createdAt?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  page?: number;
  totalPages?: number;
  total?: number;
}

function Teams() {
  const [page, setPage] = useState(1);
  const { data: response, loading, error } = useApi<PaginatedResponse<Team> | Team[]>(
    `/teams?page=${page}`
  );

  // Handle both paginated and array responses
  const teams = Array.isArray(response) ? response : response?.data || [];
  const totalPages = !Array.isArray(response) && response?.totalPages ? response.totalPages : 1;

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h2 className="mb-4">🤝 Teams</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading teams: {error.message}
          </div>
        )}

        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : teams && teams.length > 0 ? (
          <>
            <div className="row g-4">
              {teams.map((team) => (
                <div key={team._id} className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">{team.name}</h5>
                        {team.score !== undefined && (
                          <span className="badge bg-primary">{team.score} pts</span>
                        )}
                      </div>
                      {team.description && <p className="card-text">{team.description}</p>}
                      <div className="mt-3">
                        <small className="d-block text-muted mb-2">Members ({team.members?.length || 0}):</small>
                        <div className="d-flex flex-wrap gap-2">
                          {team.members && team.members.length > 0 ? (
                            team.members.map((member, idx) => (
                              <span key={idx} className="badge bg-info">
                                {member}
                              </span>
                            ))
                          ) : (
                            <small className="text-muted">No members yet</small>
                          )}
                        </div>
                      </div>
                      {team.createdAt && (
                        <p className="mt-3 mb-0">
                          <small className="text-muted">
                            Created {new Date(team.createdAt).toLocaleDateString()}
                          </small>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
          <div className="alert alert-info">No teams found.</div>
        )}
      </div>
    </div>
  );
}

export default Teams;
