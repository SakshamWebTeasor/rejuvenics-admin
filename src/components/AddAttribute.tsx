import { Button, Offcanvas } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FiUploadCloud } from "react-icons/fi";
import Switch from "react-switch";
import { useState } from "react";

export type AddAttributeProps = {
  show: boolean;
  handleClose: () => void;
};

export default function AddAttribute({ show, handleClose }: AddAttributeProps) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <div className="add-category-offcanvas">
          <Offcanvas.Title>Add Attribute Value</Offcanvas.Title>
          <p>Add your attribute values and necessary information from here</p>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          <Col xl={4} lg={4}>
            <p className="m-0">Attribute Title</p>
          </Col>
          <Col xl={8} lg={8}>
            <Form.Control type="text" placeholder="Attribute title" />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xl={4} lg={4}>
            <p className="mb-0 ">Display Name</p>
          </Col>
          <Col xl={8} lg={8}>
            <Form.Control type="text" placeholder="Display Name" />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xl={4} lg={4}>
            <p className="mb-0 ">Options</p>
          </Col>
          <Col xl={8} lg={8}>
            <Form.Select aria-label="Default select example">
              <option>select Type</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xl={4} lg={4}>
            <p className="m-0">Variants</p>
          </Col>
          <Col xl={8} lg={8}>
            <Form.Control
              type="text"
              placeholder="Press enter to add variant"
            />
          </Col>
        </Row>
      </Offcanvas.Body>
      <div className="footer-offcanvas">
        <Button type="button" className="btn btn-light">
          Cancel
        </Button>
        <Button type="submit" className="btn btn-greens">
          Save
        </Button>
      </div>
    </Offcanvas>
  );
}
