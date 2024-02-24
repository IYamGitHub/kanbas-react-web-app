import { FaArrowRight, FaRegCalendar } from "react-icons/fa";
import { Bs1CircleFill, BsFillBarChartLineFill, BsBell } from "react-icons/bs";
import { PiCrosshairLight } from "react-icons/pi";
import { LiaBullhornSolid } from "react-icons/lia";
import { LuFileInput } from "react-icons/lu";

import { course_status } from "../../Database";
import "./Status.css";
import { useCourse } from "../index";

const CourseStatus = () => {
  const course = useCourse();
  const courseStatus = course_status.find(
    (status) => status.course === course?._id
  );

  const actions = [
    {
      label: "Import Existing Content",
      icon: <LuFileInput className="fs-5 account" />,
    },
    {
      label: "Import from Commons",
      icon: <FaArrowRight className="fs-5" />,
    },
    { label: "Choose Home Page", icon: <PiCrosshairLight className="fs-5" /> },
    {
      label: "View Course Stream",
      icon: <BsFillBarChartLineFill className="fs-5" />,
    },
    { label: "New Announcement", icon: <LiaBullhornSolid className="fs-5" /> },
    {
      label: "New Analytics",
      icon: <BsFillBarChartLineFill className="fs-5" />,
    },
    {
      label: "View Course Notifications",
      icon: <BsBell className="fs-5" />,
    },
  ];

  return (
    <div id="course-home-sidebar" className="d-none d-xl-block p-3 pe-4 mt-2">
      <div id="ch-course-status">
        <h3 className="mb-1 fw-bolder">Course Status</h3>
        <button type="button" className="btn btn-grey">
          <i className="fa fa-ban"></i> Unpublish
        </button>
        <button type="button" className="btn btn-success">
          <i className="fa fa-check-circle"></i> Published
        </button>
        <ul className="p-0 d-flex flex-column my-3 gap-1">
          {actions.map((action) => (
            <li className="btn btn-grey text-start">
              <a href="#">
                {action.icon} {action.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div id="ch-todo">
        <h3 className="m-0 fw-bolder mt-4">To Do</h3>
        <hr className="my-1" />
        <ul className="list-group todo rounded-0 my-2 wd-modules">
          {courseStatus?.todo?.map((todoItem) => (
            <li key={todoItem._id} className="list-group-item border-0 d-flex">
              <Bs1CircleFill className="text-danger m-1 me-2 fs-6" />
              <div>
                <a href="#">{todoItem.name}</a>
                <p>
                  {todoItem.points} points - {todoItem.due_date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div id="ch-calendar">
        <div className="d-flex todo align-items-center justify-content-between mt-4">
          <h3 className="m-0 fw-bolder">Coming Up</h3>
          <span>
            <i className="fa fa-calendar-o" aria-hidden="true"></i>
            <a href="#">View Calendar</a>
          </span>
        </div>
        <hr className="my-1" />
        <ul className="list-group todo rounded-0 my-2 wd-modules">
          {courseStatus?.calendarItems?.map((calendarItem) => (
            <li className="list-group-item border-0 d-flex">
              <FaRegCalendar className="text-secondary m-1 me-2 fs-6" />
              <div>
                <a href="#">{calendarItem.name}</a>
                <p>
                  {course?.number}.{course?.section}.{course?.term}
                </p>
                <p>{calendarItem.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseStatus;
