import React, {
  useEffect,
  useReducer,
  Suspense,
  lazy
} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { AppContext } from "./utils/context";
import reducer, {initialState} from "./reducers";

// TOKEN eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNpZGVuY2VfaWQiOjEsInVzZXJfaWQiOjcyLCJleHAiOjE2MTY3NzE4MDIsImlhdCI6MTYxNDM1MjYwMn0.W0kKf8hASzRyouvlETMy-a5J7qoiKoM3_CZo_-Iw8d4
// UTILS
import SEO from "./utils/seo"

// pages
const ErrorPage = lazy(() => import("./pages/error/Page404"));
const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Create = lazy(() => import("./pages/create/Create"));
const Edit = lazy(() => import("./pages/edit/Edit"));

// Context

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "CHECKTOKEN"
    });
  }, [])

  //Log out
  const submitLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  const PrivateRoute = ({component: Component, auth, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => auth
          ? <Component {...props} />
          : <Redirect to="/login" />}
      />
    )
  }

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <SEO title="Test Frontend" />
      {state.router ? (
      <div className="container mt-5">
        <BrowserRouter>
        <div className="card mb-3">
          <div className="card-body">
            <Link to="/">Home</Link> &nbsp;
            {state.isAuthenticated ? <Link to="/dashboard">Dashboard</Link> : null} &nbsp;
            {state.isAuthenticated ? <a href="#" onClick={submitLogout}>Logout</a> : <Link to="/login">Login</Link>}
            <div className="float-right">
              <strong>{state.isAuthenticated ? `Hi, ${state.user.name}` : null}</strong>
            </div>
          </div>
        </div>

          <Suspense fallback={
            <div className="loading">
              <p style={{ margin: "auto" }}>Loading...</p>
            </div>
            }>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact auth={state.isAuthenticated} path="/dashboard" component={Dashboard} />
              <PrivateRoute exact auth={state.isAuthenticated} path="/create" component={Create} />
              <PrivateRoute auth={state.isAuthenticated} path="/edit/:id" component={Edit} />
              <Route exact path="/login" render={() => state.isAuthenticated ? <Redirect to="/dashboard" /> : <Login /> } />
              <Route exact path="/404" component={ErrorPage} />
              <Route exact path="*" render={() => <Redirect to="/404" />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
      ) : 
      null }
    </AppContext.Provider>
  );
}


export default App;
