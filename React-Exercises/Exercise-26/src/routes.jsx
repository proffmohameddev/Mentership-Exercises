import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import Dashboard from './Dashboard';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Posts from './Courses';
import Courses from './Courses';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute element={<Dashboard/>}/>
        )
      },
      {
        path: "courses",
        element: <Courses/>
        
      },
      {
        path: "login",
        element: <Login/>
      }
    ]
  },
]); 