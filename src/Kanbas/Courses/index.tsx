import { courses } from "../../Kanbas/Database";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import { HiMiniBars3 } from "react-icons/hi2";
import { FaGlasses } from "react-icons/fa";

import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "./index.css";
import Home from "./Home";
import { createContext, useContext, useState } from "react";
import NavBar from "./Navigation/NavBar";
import Assignments from "./Assignments";

function getCoursePath(path: String) {
  const parts = path.split("/");
  return parts[parts.length - 1];
}

type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string; // Dates as strings, assuming no need for Date objects
  endDate: string;
  image: string;
  section: string;
  term: string;
  semester: string;
  termSize: string;
};

type CourseContextType = Course | null;

const CourseContext = createContext<CourseContextType>(null);
export const useCourse = () => useContext(CourseContext);

function Courses() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId) || null;
  const { pathname } = useLocation();
  const [showCourseNav, setShowCourseNav] = useState<Boolean>(true);

  return (
    <CourseContext.Provider value={course}>
      <div className="p-4 pb-1 custom-breadcrumb d-none d-md-block">
        <div className="d-flex justify-content-between align-items-center pb-3">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <span className="kanbas-red fw-normal">
                <HiMiniBars3
                  className="me-4 fs-4 nav-bars"
                  onClick={() => setShowCourseNav(!showCourseNav)}
                />
                {course?.number}.{course?.section}.{course?.term}
              </span>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span className="font-black">{getCoursePath(pathname)}</span>
            </li>
          </ol>
          <button className="btn btn-grey">
            <FaGlasses className="me-1" />
            Student View
          </button>
        </div>
        <hr className="m-0" />
      </div>
      <NavBar />
      <div className={`${showCourseNav ? "course-content" : "content-no-nav"}`}>
        <div className="left-side d-none d-md-block">
          {showCourseNav && <CourseNavigation />}
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </CourseContext.Provider>
  );
}
export default Courses;
