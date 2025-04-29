
// import { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setIsAuthenticated(true);  
//       setUser(JSON.parse(storedUser)); 
//     }
//   }, []);

//   const login = (email, password) => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.email === email && storedUser.password === password) {
//       setIsAuthenticated(true); 
//       setUser(storedUser);  
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("user");  
//     setIsAuthenticated(false);  
//     setUser(null);  
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;




import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Yeni loading durumu

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // ✅ Yükleme tamamlandı
  }, []);

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;