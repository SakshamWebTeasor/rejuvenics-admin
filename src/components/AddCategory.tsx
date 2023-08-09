import { Button, Offcanvas, Spinner } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { FiUploadCloud } from "react-icons/fi";
import Switch from "react-switch";
import { useState, FormEvent } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { CategoryModel } from "@/model/category.model";

export type AddCategoryProps = {
  show: boolean;
  handleClose: () => void;
  onAdd: (data:CategoryModel) => void;
  token: string;
};

export default function AddCategory({ show, handleClose, onAdd, token }: AddCategoryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);
      const response = await axios.post("/category", {
        name: formData.get('title'),
        parent_category: formData.get('parent_category') === "" ? null : formData.get('parent_category'),
        status: formData.get('status') === "on" ? true : false
      },{
        headers:{
          Authorization: "Bearer "+ token
        }
      })

      if (response?.status && response?.status != 201) {
        throw new Error("Something Went Wrong");
      }
      const category:CategoryModel = response.data.data;
      onAdd(category);
      setIsLoading(false);
      handleClose();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        theme: "colored",
      });
    }

  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Form onSubmit={handleFormSubmit}>
        <Offcanvas.Header closeButton>
          <div className="add-category-offcanvas">
            <Offcanvas.Title>Add Category</Offcanvas.Title>
            <p>Add your Product category and necessary information from here</p>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col xl={4} lg={4}>
              <p className="m-0">Name</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Control type="text" name="title" placeholder="Category title" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="mb-0 ">Description</p>
            </Col>
            <Col xl={8} lg={8}>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Category Description"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Category Description"
                  style={{ height: "100px" }}
                  name="description"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="mb-0 ">Parent Category</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Select aria-label="Default select example" name="parent_category">
                <option value="">Open this select menu</option>
                <optgroup label="Swedish Cars">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </optgroup>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="mb-0 ">Category Image</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Group controlId="formFile" className="file-upload">
                <Form.Control type="file" name="icon" />
                <div className="file-icon">
                  <FiUploadCloud />
                  <h6>Drag your images here</h6>
                  <small>
                    <i>(Only *.jpeg, *.webp and *.png images will be accepted)</i>
                  </small>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xl={4} lg={4}>
              <p className="mb-0 ">Published</p>
            </Col>
            <Col xl={8} lg={8}>
              <Switch
                name="status"
                onChange={handleChange}
                checked={checked}
                className="react-switch"
                offColor="#e53e3e"
                onColor="#0e9f6e"
                height={28}
                width={80}
                handleDiameter={28}
                checkedIcon={
                  <span className="text-white text-start px-4 py-6">Yes</span>
                }
                uncheckedIcon={<span className="text-white text-start">No</span>}
              />
            </Col>
          </Row>
        </Offcanvas.Body>
        <div className="footer-offcanvas">
          {isLoading ? (<>
            <Button type="button" className="btn btn-light" disabled>
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-greens"
              disabled={true}
            >
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Saving...
            </Button>
          </>

          ) : (<>
            <Button type="button" className="btn btn-light">
              Cancel
            </Button>
            <Button type="submit" className="btn btn-greens">
              Save
            </Button>
          </>)}
        </div>
      </Form>
    </Offcanvas>
  );
}
