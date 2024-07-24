import React from "react";
import Header from "../Header/Header/Header";

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LayOut;
