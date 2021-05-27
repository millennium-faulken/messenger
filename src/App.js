import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/Auth";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Homepage from "./dashboard/Homepage";
import Nav from "./layout/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Nav />
          <Switch>
            <Route exact path="/home" component={Homepage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        </AuthProvider>
        {/* 
            <Route exact path="/" component={LandingPage} />
           */}
      </div>
    </BrowserRouter>
  );
}

export default App;
