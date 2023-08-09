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
import { extractNumeralContent } from "@/lib/helper";
import { useRouter } from "next/router";

export type AddCategoryProps = {
  show: boolean;
  handleClose: () => void;
  // onAdd: (data:CategoryModel) => void;
  token: string;
};

export default function AddCoupon({ show, handleClose,
  // onAdd, 
  token }: AddCategoryProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);
  // {
  //   "name": "string",
  //   "code": "string",
  //   "time": "string",
  //   "type": true,
  //   "discount": 0,
  //   "amount": 0,
  //   "is_active": true,
  //   "is_deleted": true
  // }
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);
      console.log('first', JSON.stringify(formData.get('price')))
      const response = await axios.post("/coupon", {
        name: formData.get('title'),
        code: formData.get('code') === "" ? null : formData.get('code'),
        amount: formData.get('amount') === "" ? null : extractNumeralContent(JSON.stringify(formData.get('amount'))),
        startDate: formData.get('start-date') === "" ? null : extractNumeralContent(JSON.stringify(formData.get('start-date'))),
        endDate: formData.get('end-date') === "" ? null : extractNumeralContent(JSON.stringify(formData.get('end-date'))),
        type: formData.get('type') === "" ? null : extractNumeralContent(JSON.stringify(formData.get('type'))),
        discount: formData.get('discount') === "" ? null : extractNumeralContent(JSON.stringify(formData.get('discount'))),
        is_active: true
      }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      if (response?.status && response?.status != 201) {
        throw new Error("Something Went Wrong");
      }
      const category: CategoryModel = response.data.data;
      // onAdd(category);
      setIsLoading(false);
      handleClose();
      setTimeout(() => {
        router.push(`${window.location.pathname}`);
      }, 200)
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        theme: "colored",
      });
      setTimeout(() => {
        router.push(`${window.location.pathname}`);
      }, 200)
    }

  };

  //	NAME	DESCRIPTION	SKU	PRICE	SPECIFICATION	DISCOUNT

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Form onSubmit={handleFormSubmit}>
        <Offcanvas.Header closeButton>
          <div className="add-category-offcanvas">
            <Offcanvas.Title>Add Product</Offcanvas.Title>
            <p>Add your Product related necessary information from here</p>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col xl={4} lg={4}>
              <p className="m-0">Name</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Control type="text" name="title" placeholder="Product title" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="mb-0 ">Coupon Code</p>
            </Col>
            <Col xl={8} lg={8}>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Coupon Code Here"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Product Description"
                  style={{ height: "100px" }}
                  name="code"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="mb-0 ">Coupon Type</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Select name="type">
                <option>Select Type</option>
                <option value="1">Percentage</option>
                <option value="2">FixedValue</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="m-0">AMOUNT</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Control type="number" name="amount" placeholder="AMOUNT" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="m-0">Discount</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Control type="number" name="discount" placeholder="Discount" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="m-0">Start Date</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Control type="date" name="start-date" placeholder="Discount" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={4} lg={4}>
              <p className="m-0">End Date</p>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Control type="date" name="end-date" placeholder="Discount" />
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
