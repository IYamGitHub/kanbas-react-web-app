import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./index.css";

function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />
      <div className="d-flex flex-column-reverse flex-md-row">
        <div className="flex-grow-1">
          <h2>Published Courses ({courses.length})</h2>
          <hr />
          <div className="row">
            <div className="flex-row flex-wrap d-flex row-cols-1 row-cols-md-5 g-30">
              {courses.map((course) => (
                <div key={course._id} className="col card">
                  <img
                    src={`/images/${course.image}`}
                    className="card-img-top"
                    style={{ height: 150 }}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <div>
                      <div className="d-flex align-items-center justify-content-between">
                        <Link
                          className="card-title stretched-link text-ellipsis"
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          style={{ color: "navy", fontWeight: "bold" }}
                        >
                          {course.number} {course.name}
                        </Link>

                        <button
                          className="z-2 btn btn-warning ms-1 py-1 px-2"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="z-2 btn btn-red ms-1 py-1 px-2"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                      <h3 className="card-text">
                        {course.number}.{course.section}.{course.term}
                      </h3>
                      <p className="card-text text-ellipsis">
                        {course.term}_1 {course.semester} {course.termSize} Term
                      </p>
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
        <hr className="d-md-none" />
        <div className="ps-md-4 d-flex flex-column">
          <h5>Add Course</h5>
          <label> 
            Course Name
          <input
            value={course.name}
            className="form-control"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          </label>
          <label className="mt-2"> Course Number
          <input
            value={course.number}
            className="form-control"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />
          </label>
          <label className="mt-2"> Start Date
          <input
            value={course.startDate}
            className="form-control"
            type="date"
            onChange={(e) =>
              setCourse({ ...course, startDate: e.target.value })
            }
          />
          </label>
          <label className="mt-2"> End Date
          <input
            value={course.endDate}
            className="form-control"
            type="date"
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
          />
          </label>
          <label className="mt-2"> Section Number
          <input
            value={course.section}
            className="form-control"
            type="string"
            onChange={(e) => setCourse({ ...course, section: e.target.value })}
          />
          </label>
          <label className="mt-2"> Term Number
          <input
            value={course.term}
            className="form-control"
            type="string"
            onChange={(e) => setCourse({ ...course, term: e.target.value })}
          />
          </label>
          <label className="mt-2"> Semester
          <input
            value={course.semester}
            className="form-control"
            type="string"
            onChange={(e) => setCourse({ ...course, semester: e.target.value })}
          />
          </label>
          <label className="mt-2"> Term Size
          <input
            value={course.termSize}
            className="form-control"
            type="string"
            onChange={(e) => setCourse({ ...course, termSize: e.target.value })}
          />
          </label>
          <div>
          <button className="btn btn-success mt-3" onClick={addNewCourse}>
            Add
          </button>

          <button className="btn btn-warning mt-3 ms-2" onClick={updateCourse}>
            Update
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
