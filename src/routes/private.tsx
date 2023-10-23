import { ReactNode, useEffect, useState } from "react";

import { auth } from "../services/FirebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Private({ children }: PrivateProps): any {
  const [isLoading, setIsLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const onsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user?.email,
          uid: user?.uid,
        };

        localStorage.setItem("@reactlinks", JSON.stringify(userData));

        setIsLoading(false);
        setSigned(true);
      } else {
        setIsLoading(false);
        setSigned(false);
      }

      return () => {
        onsub();
      };
    });
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
