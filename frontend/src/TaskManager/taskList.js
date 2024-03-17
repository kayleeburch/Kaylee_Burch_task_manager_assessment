import { useState, useEffect } from "react";
import { ListGroup, Form } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskModal from "./taskModal";
import DeleteTaskModal from "./deleteTaskModal";

const TaskList = ({ completed }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "blah blah blah", completed: false },
    { id: 2, title: "Task 2", description: "blah blah blah", completed: false },
    { id: 3, title: "Task 3", description: "blah blah blah", completed: true },
  ]);
  const [selectedTask, setSelectedTask] = useState({});
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  const handleUpdateTask = async (id, completed) => {
    console.log(`Update Task ID: ${id}`);
    // Dummy function
  };

  //handles showing the edit task modal
  const handleShowEditTaskModal = async (task) => {
    console.log("Edit Task: ", task);
    setSelectedTask(task);
    setShowEditTaskModal(true);
  };

  //handles showing the delete task modal
  const handleShowDeleteTaskModal = async (task) => {
    setSelectedTask(task);
    setShowDeleteTaskModal(true);
  };

  return (
    <>
      {showEditTaskModal && (
        <EditTaskModal
          task={selectedTask}
          show={showEditTaskModal}
          handleClose={() => setShowEditTaskModal(false)}
        />
      )}
      {showDeleteTaskModal && (
        <DeleteTaskModal
          task={selectedTask}
          show={showDeleteTaskModal}
          handleClose={() => setShowDeleteTaskModal(false)}
        />
      )}
      <ListGroup className="mt-3">
        {tasks
          ?.filter((task) => task.completed === completed)
          ?.map((task) => (
            <ListGroup.Item
              key={task.id}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleUpdateTask(task.id)}
                  className="me-2"
                />
                {task.title} - {task.description}
              </div>
              <div>
                <EditIcon
                  onClick={() => handleShowEditTaskModal(task)}
                  style={{ cursor: "pointer" }}
                  className="mx-3"
                />
                <DeleteIcon
                  onClick={() => handleShowDeleteTaskModal(task)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default TaskList;
