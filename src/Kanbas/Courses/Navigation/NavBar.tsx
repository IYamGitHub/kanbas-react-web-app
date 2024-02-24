import { FaBullseye, FaRegCircle, FaChevronDown } from "react-icons/fa";
import { GrChatOption } from "react-icons/gr";
import {
  IoHomeOutline,
  IoRocketOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LiaBullhornSolid, LiaFileAlt } from "react-icons/lia";
import { LuNetwork, LuPlug, LuFileEdit, LuClipboardList } from "react-icons/lu";
import { PiUsers, PiFolder } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";
import { Link } from "react-router-dom";
import { KanbasNavLinks } from "../../Navigation";
import { useCourse } from "..";

const NavBar = () => {
  const courseId = useCourse()?._id;

  const courseNavLinks = [
    { label: "Home", icon: <IoHomeOutline className="fs-2" /> },
    { label: "Modules", icon: <LuNetwork className="fs-2" /> },
    { label: "Piazza", icon: <LuPlug className="fs-2" /> },
    { label: "Zoom Meetings", icon: <LuPlug className="fs-2" /> },
    { label: "Assignments", icon: <LuFileEdit className="fs-2" /> },
    { label: "Quizzes", icon: <IoRocketOutline className="fs-2" /> },
    { label: "Grades", icon: <SlNotebook className="fs-2" /> },
    { label: "People", icon: <PiUsers className="fs-2" /> },
    { label: "Panopto Video", icon: <LuPlug className="fs-2" /> },
    { label: "Discussions", icon: <GrChatOption className="fs-2" /> },
    { label: "Announcements", icon: <LiaBullhornSolid className="fs-2" /> },
    { label: "Pages", icon: <LiaFileAlt className="fs-2" /> },
    { label: "Files", icon: <PiFolder className="fs-2" /> },
    { label: "Rubrics", icon: <LuClipboardList className="fs-2" /> },
    { label: "Outcomes", icon: <FaBullseye className="fs-2" /> },
    { label: "Collaborations", icon: <FaRegCircle className="fs-2" /> },
    { label: "Syllabus", icon: <SlNotebook className="fs-2" /> },
    {
      label: "Progress Reports (EAB Navigate)",
      icon: <LuPlug className="fs-2" />,
    },
    { label: "Settings", icon: <IoSettingsOutline className="fs-2" /> },
  ];

  return (
    <div className="d-block d-md-none" id="kanbas-navbar">
      <nav className="navbar navbar-dark bg-dark px-2">
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#kanbas-navigation"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#course-navigation"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaChevronDown />
        </button>
      </nav>
      <div
        className="collapse mb-3 bg-white p-2 shadow"
        id="kanbas-navigation"
        data-bs-parent="#kanbas-navbar"
      >
        <ul className="wd-kanbas-navigation-bar">
          {KanbasNavLinks.map((link, index) => (
            <li key={index} className="p-2 pb-3">
              <Link to={`/Kanbas/${link.label}`}>
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="collapse mb-3 bg-white p-2 shadow"
        id="course-navigation"
        data-bs-parent="#kanbas-navbar"
      >
        <ul className="wd-kanbas-navigation-bar p-2">
          {courseNavLinks.map((link) => (
            <li>
              <Link to={`/Kanbas/Courses/${courseId}/Home${link.label}`}>
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
