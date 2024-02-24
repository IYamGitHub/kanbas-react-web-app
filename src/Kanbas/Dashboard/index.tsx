import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import { FaEdit } from "react-icons/fa";
import "./index.css";

function Dashboard() {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />
      <div className="m-4">
        <h2>Published Courses ({courses.length})</h2> 
        <hr />
        <div className="row">
          <div className="flex-row flex-wrap d-flex row-cols-1 row-cols-md-5 g-30">
            {courses.map((course) => (
              <div key={course._id} className="col card">
                  <img src={`/images/${course.image}`} className="card-img-top"
                        style={{ height: 150 }} alt={course.name}/>
                  <div className="card-body">
                    <div>
                      <Link className="card-title stretched-link text-ellipsis" to={`/Kanbas/Courses/${course._id}/Home`}
                          style={{ color: "navy", fontWeight: "bold" }}>
                          {course.number} {course.name}</Link>
                      <h3 className="card-text">{course.number}.{course.section}.{course.term}</h3>
                      <p className="card-text text-ellipsis">{course.term}_1 {course.semester} {course.termSize} Term</p>
                    </div>
                    <div className="card-action-items">
                      <Link to={`/Kanbas/Courses/${course._id}/Assignments`}>
                        <FaEdit /> 
                      </Link>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;