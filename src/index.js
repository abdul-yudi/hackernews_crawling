import React from "react";
import ReactDOM from "react-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import reducer, { initialState } from "./utils/reducers";
import { AppContext } from "./utils/context";
import lazyLoading from "./components/LazyLoading";

import "./assets/css/bootstrap.min.css";
import "./assets/css/styles.css";

const PostList = lazyLoading(() => import("./pages/PostList"), {
  fallback: <ProgressBar />
});

const PostDetail = lazyLoading(() => import("./pages/PostDetail"), {
  fallback: <ProgressBar />
});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({
      type: "HIDE_LOADING"
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container my-2 mx-auto">
        {state.loading ? (
          <div>Please wait...</div>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route exact path="/detail/:id" component={PostDetail} />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    </AppContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
