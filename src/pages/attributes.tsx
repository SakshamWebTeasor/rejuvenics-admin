import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Switch from "react-switch";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import AddAttribute from "@/components/AddAttribute";
import DelAttribute from "@/components/DelAttribute";
import axios from "@/lib/axios";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { CategoryModel } from "@/model/category.model";

export const getServerSideProps: GetServerSideProps = async ({ req, res, params, query }) => {
  const page_no = params && params['page'] ? params['page'] : 1;
  const session = await getServerSession(req, res, authOptions);
  let isAll = false
  let type = 'parent_category=null&';

  if(query['type'] === "all"){
    type = '';
    isAll = true;
  }

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }


  const response = await axios.get(`/category?${type}page=${page_no}&pageSize=5`, {
    headers: {
      Authorization: "Bearer " + session.user.acess_token
    }
  })

  if (response.status != 200) {
    return {
      props: {
        isAll: false,
        dashboardData: [],
        token: "",
        total_pages: 0,
        current_page: 0
      },
    };
  }

  const data: CategoryModel = response.data.data.map((d: any) => {
    return {
      ...d,
      id: d['_id']
    }
  });
  return {
    props: {
      isAll,
      data,
      token: session.user.acess_token,
      total_pages: response.data.total_page,
      current_page: parseInt(response.data.page)
    },
  };
}

export default function Category() {
  const [checked, setChecked] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);

  const handleChange = () => setChecked(!checked);
  const handleAddForm = () => setIsAddOpen(!isAddOpen);
  const handleDeletePopUp = () => setIsDelOpen(!isDelOpen);

  return (
    <>
      <div className="main-page">
        <h5>Attributes</h5>
        <div className="order-box py-4 px-3 mt-4">
          <Row className="align-items-center">
            <Col>
              <div className="category-btn">
                <Form.Group controlId="formFile" className="demo me-3">
                  <Form.Control type="file" />
                  <span className="icon-upload-file">
                    <TfiExport /> Export
                  </span>
                </Form.Group>
                <a href="#">
                  <TfiImport />
                  &#10240; Import
                </a>
              </div>
            </Col>
            <Col>
              <div className="category-btn text-end justify-content-end">
                <a href="#" className="me-2 btn btn-danger">
                  <RiDeleteBinLine />
                  &#10240; Delete
                </a>
                <button className="btn btn-success" onClick={handleAddForm}>
                  <AiOutlinePlus />
                  &#10240; Add Attributes
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="order-box py-4 px-3 mt-4">
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Search By Attributes Name" />
          </Form.Group>
        </div>
        <div className="text-end mt-4">
          <Switch
            onChange={handleChange}
            checked={checked}
            className="react-switch"
            offColor="#0e9f6e"
            onColor="#0e9f6e"
            height={28}
            width={120}
            handleDiameter={28}
            checkedIcon={
              <span className="text-white text-start px-4 py-6 all">All</span>
            }
            uncheckedIcon={
              <span className="text-white text-start only">
                Parent&#10240;Only
              </span>
            }
          />
        </div>
        <div className="table-data mt-3">
          <Table>
            <tbody>
              <tr className="table-bg-top">
                <td>
                  <Form>
                    <div key={`default-checkbox`} className="mb-1">
                      <Form.Check // prettier-ignore
                        type={"checkbox"}
                        id={`default-checkbox`}
                      />
                    </div>
                  </Form>
                </td>
                <td>ID</td>
                <td>NAME</td>
                <td>DISPLAY Name</td>
                <td>OPTION</td>
                <td>PUBLISHED</td>
                <td>VALUES</td>
                <td>ACTION</td>
              </tr>
              <tr>
                <td>
                  <div key={`default-checkbox`} className="mb-0">
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-checkbox`}
                    />
                  </div>
                </td>
                <td>81b2</td>
                <td>Color</td>
                <td>Color</td>
                <td>Dropdown</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" />
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                    <span onClick={handleDeletePopUp}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div key={`default-checkbox`} className="mb-0">
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-checkbox`}
                    />
                  </div>
                </td>
                <td>81b2</td>
                <td>Color</td>
                <td>Color</td>
                <td>Dropdown</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" />
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                    <span onClick={handleDeletePopUp}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div key={`default-checkbox`} className="mb-0">
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-checkbox`}
                    />
                  </div>
                </td>
                <td>81b2</td>
                <td>Color</td>
                <td>Color</td>
                <td>Dropdown</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" />
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                    <span onClick={handleDeletePopUp}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div key={`default-checkbox`} className="mb-0">
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-checkbox`}
                    />
                  </div>
                </td>
                <td>81b2</td>
                <td>Color</td>
                <td>Color</td>
                <td>Dropdown</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" />
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                    <span onClick={handleDeletePopUp}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div key={`default-checkbox`} className="mb-0">
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-checkbox`}
                    />
                  </div>
                </td>
                <td>81b2</td>
                <td>Color</td>
                <td>Color</td>
                <td>Dropdown</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" />
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                    <span onClick={handleDeletePopUp}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div key={`default-checkbox`} className="mb-0">
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-checkbox`}
                    />
                  </div>
                </td>
                <td>81b2</td>
                <td>Color</td>
                <td>Color</td>
                <td>Dropdown</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" />
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                    <span onClick={handleDeletePopUp}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div key={`default-checkbox`} className="mb-0">
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-checkbox`}
                    />
                  </div>
                </td>
                <td>81b2</td>
                <td>Color</td>
                <td>Color</td>
                <td>Dropdown</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" />
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-icon">
                    <span onClick={handleAddForm}>
                      <FaEdit />
                    </span>
                    <span onClick={handleDeletePopUp}>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="pagination-section">
          <Pagination>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>

            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
      <AddAttribute show={isAddOpen} handleClose={handleAddForm} />
      <DelAttribute show={isDelOpen} handleClose={handleDeletePopUp} />
    </>
  );
}
