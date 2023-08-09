import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Row, Col } from "react-bootstrap";
import { Fragment, ReactNode, Suspense } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const session = useSession();
  const router = useRouter();

  return (
    <Fragment>
      {session.status === "authenticated" && router.pathname !== "/" ? (
        <Row className="gx-0">
          <Col xl={2}>
            <Sidebar />
          </Col>
          <Col xl={10}>
            <Header />
            <ToastContainer />
            {props.children}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xl={12}>
            <ToastContainer />
            {props.children}
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
