import React, {
  useContext,
  useRef,
  useEffect
} from "react";
import { AppContext } from "../../utils/context";

const Login = () => {

  const {state, dispatch} = useContext(AppContext);

  const email = useRef(""),
        password = useRef("");

  useEffect(() => {
    dispatch({
      type: "CHECKTOKEN"
    });
  }, [state.token])

  // Login
  const submitLogin = () => {
    if( email.current.value === "abd.rmt.wyd@gmail.com" && password.current.value === "123123123"){
      dispatch({
        type: "LOGIN",
        // Token from gorest.io
        payload: {
          "name": "Wahyudi",
          "gender": "male",
          "token": "334b184707060d20299695ef9ec4a3e44402c631c146faaa6f44024bc90c1b23"
        }
      })
    }else{
      alert("user or password incorrect");
    }
  }

  return (
    <>
      <h1>Login</h1>
			<div id="logreg-forms">
			  <form className="form form-signin">
			    <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
			      Sign in
			    </h1>
          <div className="card mb-4">
            <div className="card-body">
              Login Detail<br/>
              Email: <strong>abd.rmt.wyd@gmail.com</strong><br/>
              Password: <strong>123123123</strong>
            </div>
          </div>
			    <input
			      type="email"
			      ref={email}
			      className="form-control"
			      placeholder="Email address"
            value="abd.rmt.wyd@gmail.com"
			    />
          <br/>
			    <input
			      type="password"
			      ref={password}
			      className="form-control"
			      placeholder="Password"
            value="123123123"
			    />
          <br/>
			    <a href="#" className="btn btn-success btn-block" type="button" onClick={submitLogin}>
			      Login
			    </a>
			  </form>
			</div>
    </>
  );
};

export default Login;
