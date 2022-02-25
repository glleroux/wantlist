import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ userWantlist, children }) => {
  
    if (!userWantlist) {
      return <Navigate to="/username" replace/>
    }
  
    return children;
  };

  export default ProtectedRoute