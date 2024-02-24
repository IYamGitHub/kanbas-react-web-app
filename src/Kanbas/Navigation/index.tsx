import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaArrowRight,
  FaBook,
  FaDesktop,
  FaEnvelopeOpenText,
  FaTachometerAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegQuestionCircle,
  FaRegUserCircle,
} from "react-icons/fa";

export const KanbasNavLinks = [
  { label: "Account", icon: <FaRegUserCircle className="fs-2 account" /> },
  { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
  { label: "Courses", icon: <FaBook className="fs-2" /> },
  { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
  { label: "Inbox", icon: <FaEnvelopeOpenText className="fs-2" /> },
  { label: "History", icon: <FaRegClock className="fs-2" /> },
  { label: "Studio", icon: <FaDesktop className="fs-2" /> },
  { label: "Commons", icon: <FaArrowRight className="fs-2" /> },
  { label: "Help", icon: <FaRegQuestionCircle className="fs-2" /> },
];

function KanbasNavigation() {
  const { pathname } = useLocation();
  return (
    <div className="d-none d-md-block">
      <ul className="wd-kanbas-navigation">
        <li>
          <Link to="http://northeastern.edu">
            <img
              src="/images/northeastern-logo.png"
              alt="Northeastern logo"
              className="w-100 p-1 py-2"
            />
          </Link>
        </li>
        {KanbasNavLinks.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link.label) ? "wd-active" : ""}
          >
            <Link to={`/Kanbas/${link.label}`}>
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default KanbasNavigation;
