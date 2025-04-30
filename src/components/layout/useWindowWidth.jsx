
// import { useEffect, useState } from 'react';

// export const useWindowWidth = (callbackFn) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);

//       if (typeof callbackFn === "function") {
//         callbackFn(window.innerWidth);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [callbackFn]); 

//   return { windowWidth, setWindowWidth };
// };



import { useEffect, useState } from 'react';

export const useWindowWidth = (callbackFn) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (typeof callbackFn === "function") {
        callbackFn(width);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [callbackFn]);

  return { windowWidth };
};
