import { useState } from "react";
import Header from "./header";
import TaskList from "./taskList.js";
import { Button, Container, Row, Col } from "react-bootstrap";
import CreateTaskModal from "./taskModal.js";

export default function TaskManager() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const handleCreateTask = () => {};

  return (
    <>
      {showCreateTaskModal && (
        <CreateTaskModal
          show={showCreateTaskModal}
          handleClose={() => setShowCreateTaskModal(false)}
        />
      )}
      <Container>
        <Header />
        <Row className="mt-5">
          <Col>
            <h3>Active Tasks:</h3>
          </Col>
          <Col className="w-fit-content d-flex justify-content-end">
            <Button variant="primary" onClick={() => setShowCreateTaskModal(true)}>
              Create New Task
            </Button>
          </Col>
        </Row>
        <TaskList completed={false} />
        <Row className="mt-5">
          <h3>Completed Tasks:</h3>
        </Row>
        <TaskList completed={true} />
      </Container>
    </>
  );
}
