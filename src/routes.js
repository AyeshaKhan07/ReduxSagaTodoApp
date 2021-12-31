import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  import { UserService } from "./services/storage.service";
  import Login from "./pages/loginScreen";
  import ToDoList from "./pages/todoList";

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          UserService.isLoggedIn() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
  export default function Routes() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={ToDoList} />
        </Switch>
      </Router>
    );
  }