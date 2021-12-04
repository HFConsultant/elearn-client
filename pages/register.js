import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.table(e.target);
    try {
      setLoading(true);
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      //console.log("REGISTER RESPONSE", data);
      toast(`Thank you for registering ${user.name}! Please login`);
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      toast.error(err.response);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="p-4 mb-4 text-center jumbotron bg-primary">Register</h1>
      <div className="container pb-5 col-md-4 offset-md-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="name"
            className="p-4 mb-4 form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

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
            autoComplete="new-password"
            className="p-4 mb-4 form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!name || !email || !password || loading}
          >
            {" "}
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>

        <p className="p-3 text-center">
          Already registered?
          <Link href="/login">
            <a> Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default register;
