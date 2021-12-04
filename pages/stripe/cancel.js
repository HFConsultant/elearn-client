import { CloudSyncOutlined } from "@ant-design/icons";
import UserRoute from "../../components/routes/UserRoute";

const StripeCancel = () => {
  return (
    <UserRoute showNav={false}>
      <div className="text-center row">
        <div className="col-md-9">
          <CloudSyncOutlined className="p-5 display-1 text-danger" />
          <p className="lead">Payment failed. Please try again.</p>
        </div>
        <div className="col-md-3"></div>
      </div>
    </UserRoute>
  );
};

export default StripeCancel;
