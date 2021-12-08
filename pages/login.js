import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state access
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  //router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      //console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.push("/");
      toast(`Welcome!`);
      setEmail("");
      setPassword("");

      //  setLoading(false);
    } catch (err) {
      console.log("Login Error", err);
      toast("Login failed");
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="p-4 mb-4 text-center jumbotron bg-primary">Login</h1>
      <div className="container pb-5 col-md-4 offset-md-4">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="email"
            className="p-4 mb-4 form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            autoComplete="current-password"
            className="p-4 mb-4 form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!email || !password || loading}
          >
            {" "}
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="pt-3 text-center">
          Not registered?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>

        <p className="text-center ">
          <Link href="/forgot-password">
            <a className="text-danger">Forgot Password</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default login;
