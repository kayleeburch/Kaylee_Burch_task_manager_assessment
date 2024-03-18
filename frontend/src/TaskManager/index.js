import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Header from "./header";
import LoginRegisterButtons from "../Authentication/index.js";
import TaskList from "./taskList.js";

export default function TaskManager({ currentUser }) {
  const [alert, setAlert] = useState({});
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const handleFetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/tasks", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("There was an error fetching the tasks", error);
    }
  }, [token]);

  useEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  return (
    <Container>
      <LoginRegisterButtons currentUser={currentUser} />
      <Header currentUser={currentUser} />
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
      <TaskList
        completed={false}
        tasks={tasks}
        setAlert={setAlert}
        refetch={handleFetchTasks}
        currentUser={currentUser}
      />
      <Row className="mt-3">
        <h3>Completed Tasks:</h3>
      </Row>
      <TaskList
        completed={true}
        tasks={tasks}
        setAlert={setAlert}
        refetch={handleFetchTasks}
        currentUser={currentUser}
      />
    </Container>
  );
}
