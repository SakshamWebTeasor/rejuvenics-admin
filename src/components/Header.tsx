import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { logout } from "@/lib/helper";

export default function Header() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={<FaBell />}
                id="collasible-nav-dropdown"
                className="dropstart"
              >
                <NavDropdown.Item href="#">
                  <div className="d-flex align-items-center justify-content-between dropdown-box">
                    <Image
                      src="/sweetcorn.jpg"
                      role="presentation"
                      width={30}
                      height={30}
                      alt={"sweetcorn"}
                    />
                    <div className="data-dropdown">
                      <p className="m-0">
                        Yellow Sweet Corn Stock out, please check!
                      </p>
                      <small className="btn-red">Stock Out</small>
                      <small>&#10240;Dec 12 2021 - 12:40PM</small>
                    </div>
                    <div className="ms-3">
                      <GrFormClose />
                    </div>
                  </div>
                  <hr></hr>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <div className="d-flex align-items-center justify-content-between dropdown-box">
                    <Image
                      src="/team.jpg"
                      role="presentation"
                      width={30}
                      height={30}
                      alt={"team"}
                    />
                    <div className="data-dropdown">
                      <p className="m-0">
                        Yellow Sweet Corn Stock out, please check!
                      </p>
                      <small className="btn-green">Stock Out</small>
                      <small>&#10240;Dec 12 2021 - 12:40PM</small>
                    </div>
                    <div className="ms-3">
                      <GrFormClose />
                    </div>
                  </div>
                  <hr></hr>
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <div className="d-flex align-items-center justify-content-between dropdown-box">
                    <Image
                      src="/Radicchio.jpg"
                      role="presentation"
                      width={30}
                      height={30}
                      alt={"Radicchio"}
                    />
                    <div className="data-dropdown">
                      <p className="m-0">
                        Yellow Sweet Corn Stock out, please check!
                      </p>
                      <small className="btn-red">Stock Out</small>
                      <small>&#10240;Dec 12 2021 - 12:40PM</small>
                    </div>
                    <div className="ms-3">
                      <GrFormClose />
                    </div>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="">
              <NavDropdown
                title={
                  <Image
                    src="/login.jpeg"
                    role="presentation"
                    width={30}
                    height={30}
                    alt={"login"}
                  />
                }
                id="collasible-nav-dropdown"
                className="dropstart"
              >
                <NavDropdown.Item as={Link} href="/dashboard">
                  <p>
                    <span>
                      <RxDashboard />
                    </span>{" "}
                    Dashboard
                  </p>
                </NavDropdown.Item>
                <NavDropdown.Item href="/editProfile">
                  <p>
                    <span>
                      <AiOutlineSetting />
                    </span>{" "}
                    Edit Profile
                  </p>
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={
                  () => {
                    signOut();
                    logout();
                  }
                }>
                  <p>
                    <span>
                      <AiOutlineLogout />
                    </span>{" "}
                    Log Out
                  </p>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
