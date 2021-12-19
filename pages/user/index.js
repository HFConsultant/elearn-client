import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="p-5 d-flex justify-content-center display-1 text-danger"
        />
      )}
      {user && (
        <h1 className="p-4 text-center mp-4 jumbotron">
          {user.name}'s Courses
        </h1>
      )}
      {/* {show list of courses} */}
      {courses.length &&
        courses.map((course) => (
          <div key={course._id} className="pt-2 pb-1 media">
            <Avatar
              size={80}
              shape="square"
              src={course.image ? course.image.Location : "/course.png"}
            />

            <div className="pl-2 media-body">
              <div className="row">
                <div className="col">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <a>
                      <h5 className="mt-2 text-primary">{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>{course.lessons.length}</p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15", fontSize: "12px" }}
                  >
                    {" "}
                    By {course.instructor.name}
                  </p>
                </div>
                <div className="text-center col-md-3">
                  <Link href={`/user/course/${course.slug}`}>
                    <a>
                      <PlayCircleOutlined className="h2 pointer text-primary" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </UserRoute>
  );
};

export default UserIndex;
