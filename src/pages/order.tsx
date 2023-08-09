import Form from "react-bootstrap/Form";
import { FormEvent, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { OrderModel } from "../model/order.model"
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import axios from "@/lib/axios";
import { Button, Col, Row } from "react-bootstrap";
import { extractNumeralContent } from "@/lib/helper";
import { useRouter } from "next/router";

interface ordersList extends OrderModel {
    userName: string;
}

interface OrderProps {
    isAll: boolean,
    data: ordersList[],
    total_pages: number,
    current_page: number
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const session: any = await getServerSession(req, res, authOptions)
    let isAll = false

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    let url = "/order-details?page=1&pageSize=10";
    let orderdata: ordersList[]

    if (!session.user?.isAdmin) {
        url = `/order-details/user/${session.user.userId}?page=1&pageSize=10` //to be changed as per new order-details by user_Id api
    }
    console.log('url:', url)

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + session.user.acess_token
            }
        })

        if (response.status != 200) {
            return {
                props: {
                    dashboardData: [],
                },
            };
        }

        if (!session.user.isAdmin) {
            if (url.split('/')[1] != 'order-details') {
                orderdata = response.data[0].orders.map((d: any) => {
                    return {
                        ...d,
                        id: d['_id']
                    }
                }) //if brought from /user/orders/
            } else {
                orderdata = response.data.data.map((d: any) => {
                    return {
                        ...d,
                        id: d['_id']
                    }
                })
            }
        } else {
            orderdata = response.data.data.map((d: any) => {
                return {
                    ...d,
                    id: d['_id']
                }
            })
        }

        const data: ordersList[] = orderdata
        return {
            props: {
                isAll,
                data,
                total_pages: response.data.total_page,
                current_page: parseInt(response.data.page)
            },
        };
    } catch (error) {

    }
    const response = await axios.get(url, {
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

    if (!session.user.isAdmin) {
        if (url.split('/')[1] != 'order-details') {
            orderdata = response.data[0].orders.map((d: any) => {
                return {
                    ...d,
                    id: d['_id']
                }
            }) //if brought from /user/orders/
        } else {
            orderdata = response.data.data.map((d: any) => {
                return {
                    ...d,
                    id: d['_id']
                }
            })
        }
    } else {
        orderdata = response.data.data.map((d: any) => {
            return {
                ...d,
                id: d['_id']
            }
        })
    }

    const data: ordersList[] = orderdata
    return {
        props: {
            isAll,
            data,
            total_pages: response.data.total_page,
            current_page: parseInt(response.data.page)
        },
    };
}

export default function Orders({ data, total_pages, current_page }: OrderProps) {
    const [state, setState] = useState({ data, total_pages, current_page });

    const [filter, setFilter] = useState({
        startDate: "",
        endDate: "",
        search: "",
        status: location.search.split("?")[1] == undefined ? "" : location.search.split("?")[1],
        limit: 10,
        pageNo: 1
    })
    const changeInStatus = () => {
        setFilter((prevState) => ({ ...prevState, status: location.search.split("?")[1] == undefined ? "" : location.search.split("?")[1] }))
    }

    const router = useRouter()

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedStartDate = e.target.value;
        // If selected start date is after the current end date, update the end date too
        if (selectedStartDate > endDate) {
            setEndDate(selectedStartDate);
        }
        setStartDate(selectedStartDate);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedEndDate = e.target.value;
        // If selected end date is before the current start date, update the start date too
        if (selectedEndDate < startDate) {
            setStartDate(selectedEndDate);
        }
        setEndDate(selectedEndDate);
    };

    const getNewOrderResponse = async () => {

        let url = `/order-details?page=${filter.pageNo}&pageSize=${filter.limit}&search=${filter.search}&startDate=${filter.startDate}&endDate=${filter.endDate}&status=${filter.status}`;
        if (localStorage.getItem("isAdmin") != "true") {
            url = `/order-details/${localStorage.getItem("userId")}?page=${filter.pageNo}&pageSize=${filter.limit}&search=${filter.search}&startDate=${filter.startDate}&endDate=${filter.endDate}&status=${filter.status}`
        }
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("acess_token")
                }
            })
            console.log('response.data.data', response.data)
            setState({
                data: response.data.data,
                total_pages: response.data.total_page,
                current_page: parseInt(response.data.page)
            })
            setFilter((prevState) => ({
                ...prevState,
                pageNo: response.data.total_page,
            }))
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewOrderResponse()
        if (location.search.split("?")[1]! = filter.status) {
            changeInStatus()
        }
    }, [router, state.current_page])

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let K: any = {
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            search: formData.get('search'),
            status: formData.get('status'),
            limit: formData.get('limit') === "" ? 10 : extractNumeralContent(JSON.stringify(formData.get('limit')))
        }
        setFilter(K)
        router.push(`${window.location.pathname}`);
    };


    const handleSearchChange = (e: any) => {
        e.prevent
        setFilter((prevState) => ({ ...prevState, search: e.target.value }))
    }

    const showStatus = (i:any) => {
        if(i == 1 || i == "1") return "Processing"
        if(i == 2 || i == "2") return "Intransit"
        if(i == 3 || i == "3") return "Delivered"
        if(i == 4 || i == "4") return "Cancelled"
    }

    const OrderBox = () => {
        return (
            <div>
                <div className="p-4">
                    <Form onSubmit={handleFormSubmit}>
                        <Row className="gap-4 py-4">
                            {window.localStorage.getItem('isAdmin') == 'true' && <Col>
                                <Form.Label>
                                    Search
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="search"
                                    placeholder="Search by Customer Name"
                                    className="form-control"
                                    value={filter.search}
                                    onChange={handleSearchChange}
                                />
                            </Col>}
                            <Col>
                                <Form.Label>
                                    Status
                                </Form.Label>
                                <Form.Select name="status" value={filter.status} onChange={(e) => {
                                    setFilter((prevState) => ({ ...prevState, status: e.target.value }))
                                }}>
                                    <option hidden value='0'>
                                        Select Status
                                    </option>
                                    <option value="1">Processing</option>
                                    <option value="2">Intransit</option>
                                    <option value="3">Delivered</option>
                                    <option value="4">Cancelled</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>
                                    Order Per Page
                                </Form.Label>
                                <Form.Select name="limit" defaultValue={filter.limit.toString()} onChange={(e) => {
                                    setFilter((prevState) => ({ ...prevState, limit: parseInt(e.target.value) }))
                                }}>
                                    <option value="5">5 Order List</option>
                                    <option value="10">10 Order List</option>
                                    <option value="20">20 Order List</option>
                                    <option value="50">50 Order List</option>
                                    <option value="100">100 Order List</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="gap-4">
                            <Col>
                                <Form.Label>
                                    Start Date
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    className="form-control"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>
                                    End Date
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    className="form-control"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </Col>
                            <Col className="mt-4 p-3">
                                <Form.Label
                                    style={{ visibility: 'hidden' }}
                                >
                                    Download From . . :
                                </Form.Label>
                                {/* <Button>
                                    Download All Orders
                                    <span>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 512 512"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="32"
                                                d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"
                                            ></path>
                                        </svg>
                                    </span>
                                </Button> */}
                                <Button type={"submit"}>
                                    Apply Filters
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="main-page m-5 px-5">
                <h5>Orders</h5>
                {/* <div className="order-box py-4 px-3 mt-4">
                    <Form.Group className="" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="Search By Attributes Name" />
                    </Form.Group>
                </div> */}
                <OrderBox />
                <div className="table-data mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                {window.localStorage.getItem('isAdmin') == 'true' && <th>User Name</th>}
                                <th>Payment ID</th>
                                <th>Total</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.data.map((order: ordersList) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    {window.localStorage.getItem('isAdmin') == 'true' && <td>{order.userName}</td>}
                                    <td>{order.payment_id}</td>
                                    <td>{order.total}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.updatedAt}</td>
                                    <td>{showStatus(order.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-section">
                        <Pagination>
                            {state.current_page > 1 && <Pagination.Prev onClick={() => {
                                let prevPage = state.current_page == 1 ? 1 : state.current_page - 1
                                setFilter((prevState) => ({
                                    ...prevState,
                                    pageNo: prevPage,
                                }));
                                setState((prevState) => ({
                                    ...prevState,
                                    current_page: prevPage
                                }))
                            }} />}
                            {new Array(state.total_pages).fill(0).map((_, i) => <Pagination.Item key={i} active={i + 1 === state.current_page ? true : false} onClick={() => {
                                let newCurrentPage = i + 1;
                                setFilter((prevState) => ({
                                    ...prevState,
                                    pageNo: newCurrentPage
                                }))
                                setState((prevState) => ({
                                    ...prevState,
                                    current_page: newCurrentPage
                                }))
                            }}>{i + 1}</Pagination.Item>)}
                            {state.current_page != state.total_pages && <Pagination.Next onClick={() => {
                                let nextPage = state.current_page == state.total_pages ? state.total_pages : state.current_page + 1
                                setFilter((prevState) => ({
                                    ...prevState,
                                    pageNo: nextPage,
                                }));
                                setState((prevState) => ({
                                    ...prevState,
                                    current_page: nextPage
                                }))
                            }} />}
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}
