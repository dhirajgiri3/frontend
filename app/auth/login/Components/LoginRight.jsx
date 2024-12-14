"use client";

import AuthRight from "../../Common/AuthRight";
  
function LoginRight() {
  return (
    <AuthRight
      // Start of Selection
      title={
        <>
          Welcome back! Log in to your{" "}
          <span className="text-accent">Navkar Selection</span> account to
          continue shopping.
        </>
      }
      description={
        <>
          Access exclusive deals and personalized recommendations by logging
          into your <span className="text-accent">Navkar Selection</span>{" "}
          account — tailored just for you.
        </>
      }
    />
  );
}

export default LoginRight;
