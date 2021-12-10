import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    //console.log("Become Instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className="p-4 text-center jumbotron mp-4">Become Instructor</h1>
      <div className="container">
        <div className="row">
          <div className="text-center col-md-6 offset-md-3">
            <div className="pt-4">
              <UserSwitchOutlined className="pb-3 display-1" />
              <br />
              <h2>Setup payout to publish courses</h2>
              <p className="lead text-warning">
                We partner with Stripe to transfer earnings to your bank account
              </p>
              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Payout Setup"}
              </Button>
              <p className="lead">
                You will be redirected to Stripe to complete onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
