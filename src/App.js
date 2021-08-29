import React from "react";

import SignUp from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter, Switch,  } from "react-router-dom"
import PublicRoute from "./components/Routes/publicRoute";
import PrivateRoute from "./components/Routes/privateRoute";


function App() {
  
  return (
    <div>

     


<BrowserRouter>
        <Switch>
      
          <PublicRoute restricted={true} component={SignUp} path="/" exact />
          <PrivateRoute component={Home} path="/homepage" exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
