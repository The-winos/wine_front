import React, {useEffect, useState} from "react";

const LoginForgotPass = () => {
  const currentURL = window.location.href;

  const urlParams = new URLSearchParams(currentURL);

  const resetToken = urlParams.get('resetToken');

  return <div id="loginForgotPass">I am LoginForgotPass</div>;
};

export default LoginForgotPass;
