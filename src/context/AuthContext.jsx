// import { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Token var mı kontrolü
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true); // Eğer token varsa giriş yapmış kabul ederiz
//     }
//   }, []);

//   // Kullanıcıyı giriş yaptığında çağrılır
//   const login = (email, password) => {
//     // JWT simülasyonu, backend'e gerçek istek yapılmalı
//     const fakeToken = "yourJWTtoken"; // Bu token'ı backend'den alıyorsunuz

//     // Token'ı localStorage'a kaydediyoruz
//     localStorage.setItem("token", fakeToken);
//     setIsAuthenticated(true);
//   };

//   // Kullanıcı çıkış yaparsa token'ı temizliyoruz
//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);  
      setUser(JSON.parse(storedUser)); 
    }
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
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
