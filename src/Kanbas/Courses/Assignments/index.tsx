import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { RiDraggable } from "react-icons/ri";
import { LuFileEdit } from "react-icons/lu";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.find(
    (assignment) => assignment.course === courseId
  );
  return (
    <>
      <div className="flex-grow-1 p-5 pt-4">
        <div className="d-flex justify-content-between pb-2">
          <input
            className="form-control"
            id="search-assignment"
            placeholder="Search for Assignment"
          />
          <div className="module-actions">
            <button className="btn btn-grey">+ Group</button>
            <button className="btn btn-red">+ Assignment</button>
            <button className="btn btn-grey">
              <FaEllipsisV />
            </button>
          </div>
        </div>

        <hr className="my-2" />

        <ul className="list-group main-content rounded-0 my-4 wd-modules">
          <li className="list-group-item">
            <div className="header d-flex justify-content-between">
              <span className="d-flex align-items-center">
                <RiDraggable className="me-2" />
                <p className="m-0">ASSIGNMENTS</p>
              </span>
              <span className="float-end d-flex align-items-center">
                <div className="rounded-5 border border-secondary-subtle text-secondary p-2 py-1">
                  {assignmentList?.gradePercentage}% of Total
                </div>
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            <ul className="list-group rounded-0">
              {assignmentList?.assignments?.map((assignment) => (
                <li key={assignment._id} className="list-group-item">
                  <span className="float-start me-2 d-flex align-items-center">
                    <RiDraggable className="me-1" />
                    <LuFileEdit className="text-success me-3" />
                    <Link className="text-black"
                      to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                    >
                      <p className="m-0">{assignment.title}</p>
                      <span className="d-inline-flex text-secondary">
                        <p className="text-danger m-0 me-1">Multiple Modules</p>{" "}
                        | Due {assignment.due_date} | {assignment.points} pts
                      </span>
                    </Link>
                  </span>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {/* {<!-- Add buttons and other fields here -->} */}
      {/* <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList?.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <Link
                   to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))}
          </ul>
        </li>
      </ul> */}
    </>
  );
}
export default Assignments;
