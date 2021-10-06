import React from "react";
import "./Style/AppStyle/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersonalCompanyDetailsScreen } from "./Components/ScreensComponents/PersonalCompanyDetailsScreen.js";
import { LoansDetailsScreen } from "./Components/ScreensComponents/LoansDetailsScreen.js";
import { BankAccountDetailsScreen } from "./Components/ScreensComponents/BankAccountDetailsScreen.js";
import { RegisterScreen } from "./Components/ScreensComponents/RegisterScreen.js";
import { ProtectedRoute } from "./Components/ApplyProtectedRoutes/ProtectedRoute.js";



function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={RegisterScreen} />
        <ProtectedRoute
          path="/PersonalCompanyDetailsScreen"
          component={PersonalCompanyDetailsScreen}
        />
        <ProtectedRoute
          path="/BankAccountDetailsScreen"
          component={BankAccountDetailsScreen}
        />

        <ProtectedRoute
          path="/LoansDetailsScreen"
          component={LoansDetailsScreen}
        />
      </div>
    </Router>
  );
}

export default App;
