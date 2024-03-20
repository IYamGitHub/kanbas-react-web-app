import React, { useEffect, useState } from "react";
import "./index.css";
import { FaCheckCircle, FaTimesCircle, FaPlusCircle} from "react-icons/fa";
import { RiDraggable, RiEditFill } from "react-icons/ri";
import { PiPaperclipBold } from "react-icons/pi";
import { LuFileEdit, LuExternalLink } from "react-icons/lu";
import { LiaFileAlt, LiaLinkSolid, LiaPlusSolid } from "react-icons/lia";
import { IoEllipsisVertical } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  setModule,
  addLesson
} from "./reducer";
import { KanbasState } from "../../store";
import { useParams } from "react-router";

const LessonIcon = (type: string) => {
  switch (type) {
    case "file":
      return <PiPaperclipBold className="text-secondary" />;
    case "assignment":
      return <LuFileEdit className="text-secondary" />;
    case "page":
      return <LiaFileAlt className="text-secondary" />;
    case "link":
      return <LiaLinkSolid className="text-success" />;
    default:
      return <></>;
  }
};

type Lesson = {
  _id: string;
  name: string;
  type: string;
};

export type Module = {
  _id: string;
  name: string;
  lessons: Lesson[];
};

function ModuleList() {
  const { courseId } = useParams();
  const [selectedModules, setSelectedModules] = useState(new Set());
  const [init, setInit] = useState(false);

  const modulesList: Module[] = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setModules({ courseId: courseId }));
  }, []);

  useEffect(() => {
    console.log(!init)
    if(!init) {
      setSelectedModules(new Set(modulesList.map((module) => module._id)));
      setInit(true);
    }
  }, [modulesList]);

  const onClick = (module: Module) => {
    if (selectedModules.has(module._id)) {
      setSelectedModules(
        (prevSelected) =>
          new Set([...prevSelected].filter((m) => module._id !== m))
      );
    } else {
      setSelectedModules(
        (prevSelected) => new Set(prevSelected.add(module._id))
      );
    }
  };

  return (
    <div className="flex-grow-1 p-5 pt-4">
      <div className="module-actions pb-2">
        <button className="btn btn-grey">Collapse All</button>
        <button className="btn btn-grey">View Progress</button>
        <select
          className="btn text-start btn-grey w-auto"
          defaultValue="publishAll"
        >
          <option value="publish-all">Publish All</option>
          <option value="publish-modules+items">
            Publish All Modules and Items
          </option>
          <option value="publish-modules">Publish Modules only</option>
          <option value="unpublish-modules">Unpublish All Modules</option>
        </select>
        <div className="input-group w-auto">
          <input
            value={module.name}
            className="form-control text-start"
            onChange={(e) =>
              dispatch(setModule({ ...module, name: e.target.value }))
            }
            placeholder="Module Name"
          />
          <button
            className="btn btn-warning"
            onClick={() => dispatch(updateModule(module))}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-red input-button"
            onClick={() => {
              setSelectedModules((prev) => new Set([...prev, module._id]))
              dispatch(addModule({ ...module, course: courseId }))
            }}
          >
            Add
          </button>
        </div>
      </div>

      {modulesList.map((module) => (
        <ul
          key={module._id}
          className="list-group main-content rounded-0 my-4 wd-modules"
        >
          <li className="list-group-item">
            <div className="header" onClick={() => onClick(module)}>
              <RiDraggable className="me-2" />
              {module.name}
              <span className="float-end">
                <FaTimesCircle
                  className="text-danger fs-5"
                  onClick={() => dispatch(deleteModule(module._id))}
                />
                <FaPlusCircle className="ms-2 text-success fs-5" 
                  onClick={(e) => {
                    if (e && e.stopPropagation) e.stopPropagation();
                    dispatch(addLesson({moduleId: module._id, }));
                  }} />
                <RiEditFill
                  className="ms-2 text-primary fs-5"
                  onClick={(e) => {
                    if (e && e.stopPropagation) e.stopPropagation();
                    dispatch(setModule(module));
                  }}
                />

                {/* <FaCheckCircle className="ms-2 text-success fs-5" /> */}
                <IoEllipsisVertical className="ms-2 text-secondary fs-5" />
              </span>
            </div>
            {selectedModules.has(module._id) && (
              <ul key={`${module._id}_items`} className="list-group rounded-0">
                {module.lessons?.map((lesson: Lesson) => (
                  <li key={lesson._id} className="list-group-item">
                    <span className="float-start me-2 d-flex align-items-center">
                      <RiDraggable className="me-1" />
                      {lesson.type && LessonIcon(lesson.type)}
                      {lesson.type === "link" ? (
                        <a className="kanbas-red topic" href="#">
                          {lesson.name}
                          <LuExternalLink className="ms-2" />
                        </a>
                      ) : (
                        <p
                          className={`${
                            lesson.type === "header" ? "m-0" : "topic"
                          }`}
                        >
                          {lesson.name}
                        </p>
                      )}
                    </span>
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <IoEllipsisVertical className="ms-2 text-secondary" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
}
export default ModuleList;
