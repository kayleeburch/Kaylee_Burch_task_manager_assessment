import { Container, Row, Col, Button } from "react-bootstrap";

const Authentication = () => {
  return (
    <Container>
      <Row className="mt-3 d-flex justify-content-end">
        <Col sm={1}>
          <Button href="/register" variant="success">
            Register
          </Button>
        </Col>
        <Col sm={1}>
          <Button href="/login">Login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Authentication;
