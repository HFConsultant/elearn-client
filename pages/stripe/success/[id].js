import { useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";
import UserRoute from "../../../components/routes/UserRoute";
import { useRouter } from "next/router";
import axios from "axios";

const StripeSuccess = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) successRequest();
  }, [id]);

  const successRequest = async () => {
    const { data } = await axios.get(`/api/stripe-success/${id}`);
    router.push(`/user/course/${data.course.slug}`);
  };

  return (
    <UserRoute showNav={false}>
      <div className="text-center row">
        <div className="pb-5 col-md-9">
          <div className="p-5 d-flex justify-content-center">
            <SyncOutlined spin className="p-5 display-1 text-danger" />
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </UserRoute>
  );
};

export default StripeSuccess;
