import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { FaSearchPlus, FaEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import Table from "react-bootstrap/Table";
import AddProduct from "@/components/AddProduct";
import DelCommon from "@/components/DelCommon";
import Pagination from "react-bootstrap/Pagination";
import { ProductModel } from "@/model/product.model";
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import axios from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/router";

interface ProductProps {
  isAll: boolean;
  data: ProductModel[];
  token: string;
  total_pages: number;
  current_page: number;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
  query,
}) => {
  const page_no = params && params["page"] ? params["page"] : 1;
  const session = await getServerSession(req, res, authOptions);
  let isAll = false;
  let type = "parent_category=null&";

  if (query["type"] === "all") {
    type = "";
    isAll = true;
  }

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await axios.get(
    `/product?${type}page=${page_no}&pageSize=5`,
    {
      headers: {
        Authorization: "Bearer " + session.user.acess_token,
      },
    }
  );

  if (response.status != 200) {
    return {
      props: {
        isAll: false,
        dashboardData: [],
        token: "",
        total_pages: 0,
        current_page: 0,
      },
    };
  }

  const data: ProductModel = response.data.data.map((d: any) => {
    return {
      ...d,
      id: d["_id"],
    };
  });
  return {
    props: {
      isAll,
      data,
      token: session.user.acess_token,
      total_pages: response.data.total_page,
      current_page: parseInt(response.data.page),
    },
  };
};

export default function Product({
  isAll,
  data,
  total_pages,
  current_page,
  token,
}: ProductProps) {
  const router = useRouter()
  const [state, setState] = useState({ data, total_pages, current_page });
  const [checked, setChecked] = useState(isAll);
  const [isAddPOpen, setIsAddPOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState("");
  let id: any;
  const handleAddPForm = () => setIsAddPOpen(!isAddPOpen);
  const handleSetDeleteId = (ids: string) => {
    setToDeleteId(ids)
    handleDeletePopUp()
  };
  const handleDeletePopUp = () => {
    setIsDelOpen(!isDelOpen)
  };
  // const handleOnAdd = (d: ProductModel) => {
  //   console.log(state);
  //   setState({ ...state, data: [d, ...state.data] });
  // };

  const handleChange = async () => {
    const url = checked
      ? "/product?parent_category=null&page=1&pageSize=5"
      : "/product?page=1&pageSize=5";
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status != 200) {
      return {
        props: {
          dashboardData: [],
        },
      };
    }

    const data: ProductModel[] = response.data.data.map((d: any) => {
      return {
        ...d,
        id: d["_id"],
      };
    });
    setState({
      ...state,
      data: data,
      total_pages: response.data.total_page,
      current_page: parseInt(response.data.page),
    });
    setChecked(!checked);
  };

  // Define an async function to fetch data
  const fetchData = async () => {
    // Fetch the data based on the current router query and page
    const page_no = router.query.page ? parseInt(router.query.page as string) : 1;
    const type = router.query.type === "all" ? "" : "parent_category=null&";

    const response = await axios.get(
      `/product?${type}page=${page_no}&pageSize=5`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status !== 200) {
      // Handle error if needed
      return;
    }

    const data: ProductModel[] = response.data.data.map((d: any) => {
      return {
        ...d,
        id: d["_id"],
      };
    });

    // Update the state with the new data
    setState({
      data,
      total_pages: response.data.total_page,
      current_page: parseInt(response.data.page),
    });
  };

  useEffect(() => {
    // Fetch the data when the component mounts or the router changes
    fetchData();
  }, [router])

  return (
    <>
      <div className="main-page">
        <h5>Products</h5>
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
                <button
                  className="me-2 btn btn-danger"
                  onClick={handleDeletePopUp}
                >
                  <RiDeleteBinLine />
                  &#10240; Delete
                </button>
                <button className="btn btn-success" onClick={handleAddPForm}>
                  <AiOutlinePlus />
                  &#10240; Add Product
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="order-box py-4 px-3 mt-4">
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="Search By Product Name" />
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
                <td>Name</td>
                <td>Description</td>
                <td>Sku</td>
                <td>Price</td>
                <td>Specification</td>
                <td>Discount</td>
                <td>Created At</td>
                <td>Updated At</td>
                <td>PUBLISHED</td>
                <td>ACTIONS</td>
              </tr>
              {state.data.length > 0 ? (
                state.data.map((d: ProductModel, i: number) => (
                  <tr key={i}>
                    <td>
                      <div key={`default-checkbox`} className="mb-0">
                        <Form.Check // prettier-ignore
                          type={"checkbox"}
                          id={`default-checkbox`}
                        />
                      </div>
                    </td>
                    <td>{d._id}</td>
                    <td>{d.title}</td>
                    <td>{d.description}</td>
                    <td>{d.sku}</td>
                    <td>{d.price}</td>
                    <td>{d.specification}</td>
                    <td>{d.discount}</td>
                    <td>{d.createdAt}</td>
                    <td>{d.updatedAt}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={d.status}
                        readOnly
                      />
                    </td>
                    <td>
                      <div className="table-icon">
                        <span>
                          <FaSearchPlus size={17} />
                        </span>
                        <span onClick={handleAddPForm}>
                          <FaEdit />
                        </span>
                        <span onClick={() => handleSetDeleteId(d._id)}>
                          <RiDeleteBinLine />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    Not Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="pagination-section">
          {checked && state.data.length > 0 ? (
            <Pagination>
              {state.current_page > 1 && (
                <Pagination.Prev
                  as={Link}
                  href={`/products/${state.current_page - 1}?type=all`}
                />
              )}
              {new Array(state.total_pages).fill(0).map((_, i) => (
                <Pagination.Item
                  as={Link}
                  key={i}
                  active={i + 1 === state.current_page ? true : false}
                  href={`/product/${i + 1}?type=all`}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              {state.current_page !== state.total_pages && (
                <Pagination.Next
                  as={Link}
                  href={`/product/${state.current_page + 1}?type=all`}
                />
              )}
            </Pagination>
          ) : (
            <></>
          )}
          {!checked && state.data.length > 0 ? (
            <Pagination>
              {state.current_page > 1 && (
                <Pagination.Prev
                  as={Link}
                  href={`/product/${state.current_page - 1}`}
                />
              )}
              {new Array(state.total_pages).fill(0).map((_, i) => (
                <Pagination.Item
                  as={Link}
                  key={i}
                  active={i + 1 === state.current_page ? true : false}
                  href={`/product/${i + 1}`}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              {state.current_page !== state.total_pages && (
                <Pagination.Next
                  as={Link}
                  href={`/product/${state.current_page + 1}`}
                />
              )}
            </Pagination>
          ) : (
            <></>
          )}
        </div>
      </div>
      <AddProduct
        show={isAddPOpen}
        handleClose={handleAddPForm}
        token={token}
      />
      <DelCommon
        show={isDelOpen}
        handleClose={() => handleDeletePopUp()}
        toDeleteId={toDeleteId}
        setIsDelOpen={setIsDelOpen}
      />
    </>
  );
}
