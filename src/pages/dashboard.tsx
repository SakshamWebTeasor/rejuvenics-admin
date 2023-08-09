import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DiRedis } from "react-icons/di";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineCalendar, AiOutlinePrinter } from "react-icons/ai";
import { BsCart, BsTruck, BsCheck2 } from "react-icons/bs";
import { GoGitCompare } from "react-icons/go";
import { MdSavedSearch } from "react-icons/md";
import { CChart } from "@coreui/react-chartjs";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { DashboardModel } from "@/model/dashboard.model";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]';
import { extractJSONFromText } from "@/lib/helper";
import { useEffect } from "react";

interface DashboardProps {
  dashboardData: DashboardModel[];
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dashboardData: [],
      isLogin: true,
      loginUser: JSON.stringify(session.user)
    },
  };
}

export default function Dashboard(props: any) {
  function initFunction() {
    let loginUser = extractJSONFromText(props.loginUser)
    localStorage.setItem('userId', loginUser.userId)
    localStorage.setItem('access_token', loginUser.acess_token)
    localStorage.setItem('isAdmin', loginUser.isAdmin)
  }
  useEffect(() => {
    initFunction()
  }, [])
  return (
    <div className="main-page">
      <div className="dashboard">
        <h5>Dashboard Overview</h5>
        <Row className="mt-4">
          <Col xl={3} lg={4} md={6}>
            <div className="dashboard-box box-1">
              <span>
                <DiRedis />
              </span>
              <p>Today Orders</p>
              <h3>$0.00</h3>
              <small>Cash : $0.00 Card : $0.00 Credit : $0.00</small>
            </div>
          </Col>
          <Col xl={3} lg={4} md={6}>
            <div className="dashboard-box box-2">
              <span>
                <DiRedis />
              </span>
              <p>Yesterday Orders</p>
              <h3>$0.00</h3>
              <small>Cash : $0.00 Card : $0.00 Credit : $0.00</small>
            </div>
          </Col>
          <Col xl={3} lg={4} md={6}>
            <div className="dashboard-box box-3">
              <span>
                <LuShoppingCart />
              </span>
              <p>This Month</p>
              <h3>$26552.72</h3>
            </div>
          </Col>
          <Col xl={3} lg={4} md={6}>
            <div className="dashboard-box box-4">
              <span>
                <AiOutlineCalendar />
              </span>
              <p>All-Time Sales</p>
              <h3>$98090.95</h3>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xl={3} lg={4} md={6}>
            <div className="order-box">
              <div className="d-flex align-items-center">
                <div className="order-img">
                  <BsCart className="text-danger" />
                </div>
                <div className="data-page">
                  <p>Total Order </p>
                  <h3>168</h3>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={4} md={6}>
            <div className="order-box">
              <div className="d-flex align-items-center">
                <div className="order-img2">
                  <GoGitCompare className="text-primary" />
                </div>
                <div className="data-page">
                  <p>
                    Orders Pending{" "}
                    <span className="text-danger">(30191.38)</span>
                  </p>
                  <h3>56</h3>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={4} md={6}>
            <div className="order-box">
              <div className="d-flex align-items-center">
                <div className="order-img3">
                  <BsTruck className="text-info" />
                </div>
                <div className="data-page">
                  <p>Orders Processing </p>
                  <h3>18</h3>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={3} lg={4} md={6}>
            <div className="order-box">
              <div className="d-flex align-items-center">
                <div className="order-img4">
                  <BsCheck2 className="text-success" />
                </div>
                <div className="data-page">
                  <p>Orders Delivered </p>
                  <h3>93</h3>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="chart">
        <Row>
          <Col xl={6} lg={6} md={12}>
            <div className="chart-section">
              <h5>Weekly Sales</h5>
              <CChart
                type="line"
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],

                  datasets: [
                    {
                      label: "Sales",
                      backgroundColor: "#0e9f6e",
                      borderColor: "#0e9f6e",
                      pointBackgroundColor: "#0e9f6e",
                      pointBorderColor: "#fff",
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                  ],
                }}
              />
            </div>
          </Col>
          <Col xl={6} lg={6} md={12}>
            <div className="chart-section chart-round">
              <h5>Best Selling Products</h5>
              <CChart
                type="pie"
                data={{
                  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],

                  datasets: [
                    {
                      backgroundColor: [
                        "#41B883",
                        "#E46651",
                        "#00D8FF",
                        "#DD1B16",
                      ],

                      data: [40, 20, 80, 10],
                    },
                  ],
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="recent-order">
        <h5>Recent Order</h5>
        <Table className="table">
          <thead>
            <tr>
              <th>INVOICE NO</th>
              <th>ORDER TIME</th>
              <th>Customer Name</th>
              <th>METHOD</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>ACTION</th>
              <th>INVOICE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10171</td>
              <td>Jun 27, 2023 3:16 AM</td>
              <td>Sumit</td>
              <td>Cash</td>
              <td>$12520.10</td>
              <td>
                <p className="bg-warning">Pending</p>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    id="dropdown-basic"
                  >
                    Pending
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Delivered</Dropdown.Item>
                    <Dropdown.Item href="#">Pending</Dropdown.Item>
                    <Dropdown.Item href="#">Processing</Dropdown.Item>
                    <Dropdown.Item href="#">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-4">
                    <AiOutlinePrinter />
                  </span>
                  <span>
                    <MdSavedSearch />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>10171</td>
              <td>Jun 27, 2023 3:16 AM</td>
              <td>Sumit</td>
              <td>Cash</td>
              <td>$12520.10</td>
              <td>
                <p className="bg-warning">Pending</p>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    id="dropdown-basic"
                  >
                    Pending
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Delivered</Dropdown.Item>
                    <Dropdown.Item href="#">Pending</Dropdown.Item>
                    <Dropdown.Item href="#">Processing</Dropdown.Item>
                    <Dropdown.Item href="#">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-4">
                    <AiOutlinePrinter />
                  </span>
                  <span>
                    <MdSavedSearch />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>10171</td>
              <td>Jun 27, 2023 3:16 AM</td>
              <td>Sumit</td>
              <td>Cash</td>
              <td>$12520.10</td>
              <td>
                <p className="bg-warning">Pending</p>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    id="dropdown-basic"
                  >
                    Pending
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Delivered</Dropdown.Item>
                    <Dropdown.Item href="#">Pending</Dropdown.Item>
                    <Dropdown.Item href="#">Processing</Dropdown.Item>
                    <Dropdown.Item href="#">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-4">
                    <AiOutlinePrinter />
                  </span>
                  <span>
                    <MdSavedSearch />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>10171</td>
              <td>Jun 27, 2023 3:16 AM</td>
              <td>Sumit</td>
              <td>Cash</td>
              <td>$12520.10</td>
              <td>
                <p className="bg-warning">Pending</p>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    id="dropdown-basic"
                  >
                    Pending
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Delivered</Dropdown.Item>
                    <Dropdown.Item href="#">Pending</Dropdown.Item>
                    <Dropdown.Item href="#">Processing</Dropdown.Item>
                    <Dropdown.Item href="#">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-4">
                    <AiOutlinePrinter />
                  </span>
                  <span>
                    <MdSavedSearch />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>10171</td>
              <td>Jun 27, 2023 3:16 AM</td>
              <td>Sumit</td>
              <td>Cash</td>
              <td>$12520.10</td>
              <td>
                <p className="bg-warning">Pending</p>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    id="dropdown-basic"
                  >
                    Pending
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Delivered</Dropdown.Item>
                    <Dropdown.Item href="#">Pending</Dropdown.Item>
                    <Dropdown.Item href="#">Processing</Dropdown.Item>
                    <Dropdown.Item href="#">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-4">
                    <AiOutlinePrinter />
                  </span>
                  <span>
                    <MdSavedSearch />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>10171</td>
              <td>Jun 27, 2023 3:16 AM</td>
              <td>Sumit</td>
              <td>Cash</td>
              <td>$12520.10</td>
              <td>
                <p className="bg-warning">Pending</p>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    id="dropdown-basic"
                  >
                    Pending
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Delivered</Dropdown.Item>
                    <Dropdown.Item href="#">Pending</Dropdown.Item>
                    <Dropdown.Item href="#">Processing</Dropdown.Item>
                    <Dropdown.Item href="#">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-4">
                    <AiOutlinePrinter />
                  </span>
                  <span>
                    <MdSavedSearch />
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>10171</td>
              <td>Jun 27, 2023 3:16 AM</td>
              <td>Sumit</td>
              <td>Cash</td>
              <td>$12520.10</td>
              <td>
                <p className="bg-warning">Pending</p>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    id="dropdown-basic"
                  >
                    Pending
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Delivered</Dropdown.Item>
                    <Dropdown.Item href="#">Pending</Dropdown.Item>
                    <Dropdown.Item href="#">Processing</Dropdown.Item>
                    <Dropdown.Item href="#">Cancel</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-4">
                    <AiOutlinePrinter />
                  </span>
                  <span>
                    <MdSavedSearch />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="table-pagination"></div>
      </div>
    </div>
  );
}
