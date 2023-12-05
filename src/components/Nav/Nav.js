import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navs() {
    return (
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">Clinica do IFBA</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Consultas</Nav.Link>
              <Nav.Link href="/medicos">Medicos</Nav.Link>
              <Nav.Link href="/pacientes">Pacientes</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
    );
  }
  
  export default Navs;