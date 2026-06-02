import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🐙 OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-fluid flex-grow-1 py-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <h1 className="mb-4">Welcome to OctoFit Tracker</h1>
                  <p className="lead">
                    Track your fitness activities, join teams, and compete on the leaderboard!
                  </p>
                  <div className="row g-4 mt-2">
                    <div className="col-sm-6">
                      <Link to="/users" className="btn btn-primary btn-lg w-100">
                        👥 Users
                      </Link>
                    </div>
                    <div className="col-sm-6">
                      <Link to="/activities" className="btn btn-success btn-lg w-100">
                        📝 Activities
                      </Link>
                    </div>
                    <div className="col-sm-6">
                      <Link to="/workouts" className="btn btn-info btn-lg w-100">
                        💪 Workouts
                      </Link>
                    </div>
                    <div className="col-sm-6">
                      <Link to="/teams" className="btn btn-warning btn-lg w-100">
                        🤝 Teams
                      </Link>
                    </div>
                    <div className="col-sm-6">
                      <Link to="/leaderboard" className="btn btn-danger btn-lg w-100">
                        🏆 Leaderboard
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-4">
        <p className="mb-0">© 2026 OctoFit Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
