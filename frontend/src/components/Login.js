import { useHistory } from "react-router";
import { post } from "../util/rest";
import * as colors from "../styles/colors.module.scss";
import undrawEducation from "../images/undraw_education.svg";
import { Form, Button } from "react-bootstrap";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value,
    };

    post("user/login", user, ({ data }) => {
      alert("Success!");
      localStorage.accessToken = data.token;
      window.location.pathname = "/profile";
    });
  }

  return (
    <>
      <Header />
      <div style={{ display: "flex", height: "calc(100vh - 80px)" }}>
        <div
          style={{
            width: "50%",
            height: "100%",
            padding: "4em",
            margin: "0 auto",
            backgroundColor: colors.offWhite,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>Login</h2>
          </div>
          <br />
          <Form onSubmit={(e) => handleLogin(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <br />
            <Button
              variant="primary"
              type="submit"
              style={{
                width: "100%",
                border: "none",
                backgroundColor: colors.green,
                fontWeight: "500",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
        <div
          className="login-page-register"
          style={{
            width: "50%",
            backgroundColor: colors.offWhite,
            height: "100%",
            padding: "4em",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: "white" }}>New to Schoolyard?</h2>
            <br />
            <img src={undrawEducation} height="150px" />
          </div>
          <br />
          <br />
          <Button
            href="/register"
            variant="primary"
            style={{
              border: "none",
              backgroundColor: colors.offWhite,
              color: colors.darkGray,
              width: "100%",
              fontWeight: "500",
            }}
          >
            Register Here
          </Button>
        </div>
      </div>
    </>
  );
}
