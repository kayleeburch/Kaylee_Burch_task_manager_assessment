import { Row, Col } from "react-bootstrap";

export default function Header({ currentUser }) {
  return (
    <Col>
      <Row className="center">
        {currentUser?.name ? (
          <h1>Welcome, {currentUser.name}!</h1>
        ) : (
          <>
            <h1>Welcome to Task Manager!</h1>
            <h4>Login or Register to get started creating your Tasks!</h4>
          </>
        )}
      </Row>
    </Col>
  );
}
