import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Header from "./header";
import TaskList from "./taskList.js";

export default function TaskManager() {
  const [alert, setAlert] = useState({});
  const [tasks, setTasks] = useState([]);

  const handleFetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/tasks");
      setTasks(response.data); // Success response
    } catch (error) {
      setAlert({ variant: "danger", message: "There was an error getting tasks" });
    }
  }, [setAlert]);

  useEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  return (
    <Container>
      <Header />
      {alert?.message && (
        <Row>
          <Col className="mt-3">
            <Alert variant={alert.variant} onClose={() => setAlert({})} dismissible>
              {alert.message}
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="mt-3">
        <h3>Active Tasks: </h3>
      </Row>
      <TaskList completed={false} tasks={tasks} setAlert={setAlert} refetch={handleFetchTasks} />
      <Row className="mt-3">
        <h3>Completed Tasks:</h3>
      </Row>
      <TaskList completed={true} tasks={tasks} setAlert={setAlert} refetch={handleFetchTasks} />
    </Container>
  );
}
