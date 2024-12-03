import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

const Layout = () => {

  useFavourites()
  useBookings()

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user?.email),
  });

  useEffect(() => {
    const getTokenAndRegsiter = async () => {

      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope:"openid profile email",
        },
      });


      console.log("CALLING",res)
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res)
    };

    isAuthenticated && 


     getTokenAndRegsiter();
  }, [isAuthenticated]);

  

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;


// import React, { useContext, useEffect } from "react";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import { Outlet } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import UserDetailContext from "../../context/UserDetailContext";
// import { useMutation } from "react-query";
// import { createUser } from "../../utils/api";
// import useFavourites from "../../hooks/useFavourites";
// import useBookings from "../../hooks/useBookings";

// const Layout = () => {
//   useFavourites();
//   useBookings();

//   const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
//   const { setUserDetails } = useContext(UserDetailContext);

//   const { mutate } = useMutation({
//     mutationKey: [user?.email],
//     mutationFn: (token) => createUser(user?.email, token),
//     onError: (error) => {
//       console.error("Failed to create user:", error.message);
//     },
//   });

//   useEffect(() => {
//     if (isAuthenticated && user?.email) {
//       const getTokenAndRegister = async () => {
//         try {
//           const res = await getAccessTokenWithPopup({
//             authorizationParams: {
//               audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//               scope: "openid profile email",
//             },
//           });

//           console.log("Access Token:", res);
//           localStorage.setItem("access_token", res);

//           // Set token in user context
//           setUserDetails((prev) => ({ ...prev, token: res }));

//           // Call mutation to register user
//           mutate(res);
//         } catch (error) {
//           console.error("Error fetching token or registering user:", error.message);
//         }
//       };

//       getTokenAndRegister();
//     }
//   }, [isAuthenticated, user?.email, getAccessTokenWithPopup, mutate]);

//   return (
//     <>
//       <div style={{ background: "var(--black)", overflow: "hidden" }}>
//         <Header />
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Layout;
