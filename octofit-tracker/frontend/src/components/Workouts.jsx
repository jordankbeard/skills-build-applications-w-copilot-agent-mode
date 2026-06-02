import { useState } from 'react';
import { useApi } from '../hooks/useApi';

function Workouts() {
  const [page, setPage] = useState(1);
  const { data: response, loading, error } = useApi(`/workouts?page=${page}`);

  // Handle both paginated and array responses
  const workouts = Array.isArray(response) ? response : response?.data || [];
  const totalPages = !Array.isArray(response) && response?.totalPages ? response.totalPages : 1;

  const difficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h2 className="mb-4">💪 Workouts</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading workouts: {error.message}
          </div>
        )}

        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : workouts && workouts.length > 0 ? (
          <>
            <div className="row g-4">
              {workouts.map((workout) => (
                <div key={workout._id} className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">{workout.name}</h5>
                        <span className={`badge bg-${difficultyColor(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                      </div>
                      {workout.description && <p className="card-text">{workout.description}</p>}
                      <div className="mt-3">
                        <small className="d-block text-muted mb-2">Exercises:</small>
                        <div className="d-flex flex-wrap gap-2">
                          {workout.exercises.map((exercise, idx) => (
                            <span key={idx} className="badge bg-light text-dark">
                              {exercise}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 mb-0">
                        <small className="text-muted">Duration: {workout.duration} minutes</small>
                      </p>
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
          <div className="alert alert-info">No workouts found.</div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
