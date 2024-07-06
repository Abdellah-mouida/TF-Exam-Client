import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleSignIn = () => {
  const handleLoginSuccess = (response) => {
    console.log("Login Success: ", response);
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed: ", error);
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      //   theme="outline"
      size="large"
    />
  );
};

export default GoogleSignIn;
