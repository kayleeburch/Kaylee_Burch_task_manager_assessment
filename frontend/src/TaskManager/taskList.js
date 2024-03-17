import { useState } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskModal from "./taskModal";
import CreateTaskModal from "./taskModal";
import DeleteTaskModal from "./deleteTaskModal";

const TaskList = ({ tasks, completed, setAlert, refetch }) => {
  const [selectedTask, setSelectedTask] = useState({});
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  const handleUpdateTaskCompletion = async (id, completed) => {
    try {
      await axios.put(`http://127.0.0.1:5000/tasks/${id}`, {
        completed: !completed,
      });
      refetch();
    } catch (error) {
      setAlert({ variant: "danger", message: "There was an error getting tasks" });
    }
  };

  //handles showing the edit task modal
  const handleShowEditTaskModal = async (task) => {
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
      {/* these are our modals for create, edit, and delete */}
      {showCreateTaskModal && (
        <CreateTaskModal
          show={showCreateTaskModal}
          handleClose={() => {
            setShowCreateTaskModal(false);
            refetch();
          }}
          setAlert={setAlert}
        />
      )}
      {showEditTaskModal && (
        <EditTaskModal
          task={selectedTask}
          show={showEditTaskModal}
          handleClose={() => {
            setShowEditTaskModal(false);
            refetch();
          }}
          setAlert={setAlert}
        />
      )}
      {showDeleteTaskModal && (
        <DeleteTaskModal
          task={selectedTask}
          show={showDeleteTaskModal}
          handleClose={() => setShowDeleteTaskModal(false)}
          setAlert={setAlert}
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
                  onChange={() => handleUpdateTaskCompletion(task.id, completed)}
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
        {/* we only want to show create button if showing active tasks */}
        {!completed && (
          <Row className="mt-3">
            <Col className="w-fit-content d-flex justify-content-end">
              <Button variant="primary" onClick={() => setShowCreateTaskModal(true)}>
                Create New Task
              </Button>
            </Col>
          </Row>
        )}
      </ListGroup>
    </>
  );
};

export default TaskList;
