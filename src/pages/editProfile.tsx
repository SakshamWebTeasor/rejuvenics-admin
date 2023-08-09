
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit, FaSearchPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Switch from "react-switch";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { CustomerModel } from "../model/customer.model"
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import axios from "@/lib/axios";
import DelCommon from "@/components/DelCommon";
import Link from "next/link";
import AddCoupon from "@/components/AddCoupon";
import { Button, Col, FloatingLabel, Offcanvas, Row, Spinner, Image } from "react-bootstrap";

interface UserProps {
    data: CustomerModel,
    token: string,
    total_pages: number,
    current_page: number
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const session: any = await getServerSession(req, res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    try {
        const response = await axios.get(`/user/${session.user.userId}`, {
            headers: {
                Authorization: "Bearer " + session.user.acess_token,
            },
        });

        let data: CustomerModel | undefined;
        if (response.status === 200 && response.data) {
            data = response.data;
        }

        return {
            props: {
                data: data || null, // Use null if data is undefined
                token: session.user.acess_token,
                total_pages: response.data.total_page || 0,
                current_page: parseInt(response.data.page) || 0,
            },
        };
    } catch (error) {
        console.log('error:', error);
        return {
            props: {
                data: null, // Return null if there's an error or no data
                token: session.user.acess_token,
                total_pages: 0,
                current_page: 0,
            },
        };
    }
};

export default function Customer({ data, total_pages, current_page, token }: UserProps) {
    const [checked, setChecked] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);
    console.log('data', data)
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
                <h5>Edit Profile</h5>
                <div className="order-box py-5 px-5 mt-4">
                    {/* <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Search By Attributes Name" />
                    </Form.Group> */}
                    <Form
                    // onSubmit={handleFormSubmit}
                    >
                        <Offcanvas.Body>
                            <Row>
                                <Col xl={4} lg={4}>
                                    <p className="m-0">Name</p>
                                </Col>
                                <Col xl={8} lg={8}>
                                    <Form.Control type="text" name="title" placeholder="Product title" value={data.name} />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xl={4} lg={4}>
                                    <p className="m-0">Email</p>
                                </Col>
                                <Col xl={8} lg={8}>
                                    <Form.Control type="text" name="email" placeholder="Product title" value={data.email} />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xl={4} lg={4}>
                                    <p className="m-0">Phone</p>
                                </Col>
                                <Col xl={8} lg={8}>
                                    <Form.Control type="text" name="phone" placeholder="Product title" value={data.phone} />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xl={4} lg={4}>
                                    <p className="m-0">Role</p>
                                </Col>
                                <Col xl={8} lg={8}>
                                    : &nbsp;&nbsp;&nbsp;{data.isAdmin ? "Admin" : "User"}
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xl={4} lg={4}>
                                    <p className="mb-0 ">Image</p>
                                </Col>
                                <Col xl={8} lg={8} className="d-flex">
                                    <Image src={data.image ? data.image : "/image/user.png"} thumbnail alt="User Image" width="100" height="100" /> &nbsp;&nbsp;&nbsp; <Form.Control type="file" size="lg" />
                                </Col>
                            </Row>
                            <Button>Save Changes</Button>
                        </Offcanvas.Body>
                    </Form>
                </div>
            </div>
            <AddCoupon show={isAddOpen} handleClose={handleAddForm} token={token} />
        </>
    );
}
