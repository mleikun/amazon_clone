import React from "react";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Routing from "./Router";
import { useContext, useEffect } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Util/action.type";
import { auth } from "./Util/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return <Routing />;
}

export default App;
