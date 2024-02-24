import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaCheckCircle } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { PiPaperclipBold } from "react-icons/pi";
import { LuFileEdit, LuExternalLink } from "react-icons/lu";
import { LiaFileAlt, LiaLinkSolid, LiaPlusSolid } from "react-icons/lia";
import { IoEllipsisVertical } from "react-icons/io5";

import { useParams } from "react-router";

const LessonIcon = (type: string) => {
  switch (type) {
    case "file":
      return <PiPaperclipBold className="text-secondary" />;
    case "assignment":
      return <LuFileEdit className="text-secondary" />
    case "page":
      return <LiaFileAlt className="text-secondary" />
    case "link":
      return <LiaLinkSolid className="text-success" />;
    default:
      return <></>;
  }
}

type Lesson = {
  name: string;
  type: string;
};

type Module = {
  _id: string;
  name: string;
  lessons: Lesson[];
}

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.find((module) => module.course === courseId)?.modules;
  const [selectedModule, setSelectedModule] = useState(new Set(modulesList?.map(module => module._id)));

  const onClick = (module : Module) => {
    if (selectedModule.has(module._id)) {
      setSelectedModule(prevSelected => new Set([...prevSelected].filter(m => module._id !== m)))
    } else { 
      setSelectedModule(prevSelected => new Set(prevSelected.add(module._id)))
    }
  }

  return (
    <div className="flex-grow-1 p-5 pt-4">
      <div className="module-actions pb-2">
        <button className="btn btn-grey">Collapse All</button>
        <button className="btn btn-grey">View Progress</button>
        <select className="btn form-select btn-grey w-auto" defaultValue="publishAll">
          <option value="publish-all">Publish All</option>
          <option value="publish-modules+items">Publish All Modules and Items</option>
          <option value="publish-modules">Publish Modules only</option>
          <option value="unpublish-modules">Unpublish All Modules</option>
        </select>
        <button className="btn btn-red">+ Module</button>
      </div>

      {modulesList?.map((module) => (
        <ul key={module._id} className="list-group main-content rounded-0 my-4 wd-modules">
          <li className="list-group-item">
            <div className="header" onClick={() => onClick(module)}>
              <RiDraggable className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <LiaPlusSolid className="ms-2 text-secondary" />
                <IoEllipsisVertical className="ms-2 text-secondary" />
              </span>
            </div>
            {selectedModule.has(module._id) && (
              <ul key={`${module._id}_items`} className="list-group rounded-0">
                {module.lessons?.map((lesson) => (
                  <li key={lesson.name} className="list-group-item">
                    <span className="float-start me-2 d-flex align-items-center">
                      <RiDraggable className="me-1"/>
                      {lesson.type && LessonIcon(lesson.type) }
                      {lesson.type === "link" ?
                      (<a className="kanbas-red topic" href="#">{lesson.name}<LuExternalLink className="ms-2"/></a>) : 
                    (<p className={`${lesson.type === "header" ? "m-0" : "topic"}`}>{lesson.name}</p>)}
                      
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