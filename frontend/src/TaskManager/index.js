import Header from "./header";
import TaskList from "./taskList.js";
import { Container, Row } from "react-bootstrap";

export default function TaskManager() {
  return (
    <>
      <Container>
        <Header />
        <Row>
          <h3>Active Tasks:</h3>
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
