import { useState } from 'react';
import { useApi } from '../hooks/useApi';

function Activities() {
  const [page, setPage] = useState(1);
  const { data: response, loading, error } = useApi(`/activities?page=${page}`);

  // Handle both paginated and array responses
  const activities = Array.isArray(response) ? response : response?.data || [];
  const totalPages = !Array.isArray(response) && response?.totalPages ? response.totalPages : 1;

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h2 className="mb-4">📝 Activities</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading activities: {error.message}
          </div>
        )}

        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : activities && activities.length > 0 ? (
          <>
            <div className="row g-4">
              {activities.map((activity) => (
                <div key={activity._id} className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{activity.type}</h5>
                      <p className="card-text text-muted">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                      <div className="row g-2">
                        <div className="col-6">
                          <small className="d-block text-muted">Duration</small>
                          <strong>{activity.duration} min</strong>
                        </div>
                        <div className="col-6">
                          <small className="d-block text-muted">Calories</small>
                          <strong>{activity.caloriesBurned} kcal</strong>
                        </div>
                      </div>
                      {activity.description && (
                        <p className="card-text mt-3 small">{activity.description}</p>
                      )}
                      <small className="text-muted d-block mt-3">User: {activity.user}</small>
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
          <div className="alert alert-info">No activities found.</div>
        )}
      </div>
    </div>
  );
}

export default Activities;
