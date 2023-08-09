import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit, FaSearchPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Switch from "react-switch";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { CouponModel } from "../../model/coupon.model"
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import axios from "@/lib/axios";
import DelCommon from "@/components/DelCommon";
import Link from "next/link";
import AddCoupon from "@/components/AddCoupon";

interface CouponProps {
    isAll: boolean,
    data: CouponModel[],
    token: string,
    total_pages: number,
    current_page: number
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params, query }) => {
    const page_no = params && params["page"] ? params["page"] : 1;
    const session = await getServerSession(req, res, authOptions)
    let isAll = false
    let type = 'parent_category=null&';

    if (query['type'] === "all") {
        type = '';
        isAll = true;
    }
    console.log("from category index", session);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    try {
        const response = await axios.get(`/coupon?parent_category=null&page=${page_no}&pageSize=5`, {
            headers: {
                Authorization: "Bearer " + session.user.acess_token
            }
        })
        console.log("from category index resp", response);
        if (response.status != 200) {
            return {
                props: {
                    dashboardData: [],
                },
            };
        }

        const data: CouponModel[] = response.data.data.map((d: any) => {
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
    } catch (error) {

    }
    const response = await axios.get(`/coupon?parent_category=null&page=${page_no}&pageSize=5`, {
        headers: {
            Authorization: "Bearer " + session.user.acess_token
        }
    })
    console.log("from category index resp", response);
    if (response.status != 200) {
        return {
            props: {
                dashboardData: [],
            },
        };
    }

    const data: CouponModel[] = response.data.data.map((d: any) => {
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

export default function Coupon({ isAll, data, total_pages, current_page, token }: CouponProps) {
    const [checked, setChecked] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);
    const [state, setState] = useState({ data, total_pages, current_page });
    const [toDeleteId, setToDeleteId] = useState("");

    let id: any;

    const handleChange = () => setChecked(!checked);
    const handleAddForm = () => setIsAddOpen(!isAddOpen);
    const handleDeletePopUp = (ids: string) => {
        setToDeleteId(ids)
        setIsDelOpen(!isDelOpen)
    };

    return (
        <>
            <div className="main-page">
                <h5>Coupon</h5>
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
                                    &#10240; Add Coupon
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
                                <td>Code</td>
                                <td>Amount</td>
                                <td>Discount</td>
                                <td>Start-Date</td>
                                <td>End-Date</td>
                                <td>Status</td>
                                <td>ACTION</td>
                            </tr>
                            {state.data.length > 0 ? state.data.map((d: CouponModel, i: number) => <tr key={i}>
                                <td>
                                    <div key={`default-checkbox`} className="mb-0">
                                        <Form.Check // prettier-ignore
                                            type={"checkbox"}
                                            id={`default-checkbox`}
                                        />
                                    </div>
                                </td>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>
                                    {d.code}
                                </td>
                                <td>{d.amount} {d.type == "1" ? "%" : ""}</td>
                                <td>{d.discount}</td>
                                <td>{d.startDate ? d.startDate : "14-02-2023"}</td>
                                <td>{d.endDate ? d.endDate : "06-08-2023"}</td>
                                <td>
                                    <Form.Check type="switch" id="custom-switch" checked={d.is_active} readOnly />
                                </td>
                                <td>
                                    <div className="table-icon">
                                        <span>
                                            <FaSearchPlus size={17} />
                                        </span>
                                        <span onClick={handleAddForm}>
                                            <FaEdit />
                                        </span>
                                        <span onClick={() => handleDeletePopUp(d.id)}>
                                            <RiDeleteBinLine />
                                        </span>
                                    </div>
                                </td>
                            </tr>) : <tr><td colSpan={8} className="text-center">Not Found</td></tr>}
                        </tbody>
                    </Table>
                </div>
                <div className="pagination-section">
                    {checked && state.data.length > 0 ? <Pagination>
                        {state.current_page > 1 && <Pagination.Prev as={Link} href={`/coupon/${state.current_page - 1}?type=all`} />}
                        {new Array(state.total_pages).fill(0).map((_, i) => <Pagination.Item as={Link} key={i} active={i + 1 === state.current_page ? true : false} href={`/coupon/${i + 1}?type=all`}>{i + 1}</Pagination.Item>)}
                        {state.current_page !== state.total_pages && <Pagination.Next as={Link} href={`/coupon/${state.current_page + 1}?type=all`} />}
                    </Pagination> : <></>}
                    {!checked && state.data.length > 0 ? <Pagination>
                        {state.current_page > 1 && <Pagination.Prev as={Link} href={`/coupon/${state.current_page - 1}`} />}
                        {new Array(state.total_pages).fill(0).map((_, i) => <Pagination.Item as={Link} key={i} active={i + 1 === state.current_page ? true : false} href={`/coupon/${i + 1}`}>{i + 1}</Pagination.Item>)}
                        {state.current_page !== state.total_pages && <Pagination.Next as={Link} href={`/coupon/${state.current_page + 1}`} />}
                    </Pagination> : <></>}
                </div>
            </div>
            <AddCoupon show={isAddOpen} handleClose={handleAddForm} token={token} />
            <DelCommon
                show={isDelOpen}
                handleClose={() => handleDeletePopUp(id)}
                toDeleteId={toDeleteId}
                setIsDelOpen={setIsDelOpen}
            />
        </>
    );
}
