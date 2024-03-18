import { Container, Row, Col, Button } from "react-bootstrap";

const Authentication = ({ currentUser }) => {
  const logout = () => {
    // Removing the JWT from localStorage
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Container>
      <Row className="mt-3 d-flex justify-content-end">
        {currentUser?.id ? (
          <Col sm={1}>
            <Button onClick={logout} variant="danger">
              Logout
            </Button>
          </Col>
        ) : (
          <>
            <Col sm={1}>
              <Button href="/register" variant="success">
                Register
              </Button>
            </Col>
            <Col sm={1}>
              <Button href="/login">Login</Button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Authentication;
