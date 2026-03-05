// import { auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const [user] = useAuthState(auth);

//   const adminEmail = "admin@zdruzenie.com";

//   if (!user) return <Navigate to="/login" />;

//  if (user.email !== adminEmail) return <Navigate to="/" />;

//   return children;
// }

// export default ProtectedRoute;

import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { getIdTokenResult } from "firebase/auth";

function ProtectedRoute({ children }) {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          const token = await getIdTokenResult(user);
          setIsAdmin(token.claims.admin === true);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

