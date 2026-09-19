import { useContext } from "react";
import { Outlet, NavLink } from "react-router";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="app">
      <header>
        <h1>React Blog</h1>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/create">Create Post</NavLink>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
