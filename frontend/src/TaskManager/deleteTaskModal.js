import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function DeleteTaskModal({ task, show, handleClose, setAlert }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${task.id}`);
      handleClose();
      setAlert({ variant: "success", message: "Task deleted successfully!" });
    } catch (error) {
      setAlert({ variant: "danger", message: "There was an error deleting tasks" });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {task?.title}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
