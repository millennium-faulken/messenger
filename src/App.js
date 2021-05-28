import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./auth/Auth";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Homepage from "./dashboard/Homepage";
import LandingPage from "./dashboard/Landingpage";
import Nav from "./layout/Nav";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/home" component={LandingPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
