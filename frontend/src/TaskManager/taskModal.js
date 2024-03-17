import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function TaskModal({ task, show, handleClose, setAlert }) {
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!task?.id) {
      try {
        const response = await axios.post("http://127.0.0.1:5000/tasks", editedTask);
        handleClose();
        setAlert({ variant: "success", message: "Task created successfully!" });
      } catch (error) {
        setAlert({
          variant: "danger",
          message: "There was an error creating the task. Please try again.",
        });
      }
    } else {
      try {
        const response = await axios.put(`http://127.0.0.1:5000/tasks/${task.id}`, editedTask);
        handleClose();
        setAlert({ variant: "success", message: "Task updated successfully!" });
      } catch (error) {
        setAlert({
          variant: "danger",
          message: "There was an error updating the task. Please try again.",
        });
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task?.id ? `Edit Task - ${task?.title}` : "Create New Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskName">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedTask?.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={editedTask?.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
