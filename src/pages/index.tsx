import Head from "next/head";
import { Inter } from "next/font/google";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/dashboard");
    }
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        callbackUrl: "/dashboard",
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });
      
      if (response?.status && response?.status != 200) {
        throw new Error("Email and Password is Wrong");
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Rejuvenics | Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <div className="container">
          <Row className="justify-content-center gx-0">
            <Col xl={8} lg={8} md={12}>
              <div className="login-page">
                <Row className="justify-content-center gx-0">
                  <Col xl={6} lg={6} md={6}>
                    <Image
                      src="/login.jpeg"
                      role="presentation"
                      width={430}
                      height={690}
                      alt={"Login"}
                    />
                  </Col>
                  <Col xl={6} lg={6} md={6}>
                    <div className="form-section">
                      <h4 className="mb-4">Login</h4>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicpassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="*********"
                            name="password"
                          />
                        </Form.Group>
                        {isLoading ? (
                          <Button
                            variant="success"
                            type="submit"
                            className="w-100"
                            disabled={true}
                          >
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            Authenticating...
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            type="submit"
                            className="w-100"
                          >
                            Login
                          </Button>
                        )}
                        <hr className="my-5" />
                        <Button
                          variant="light"
                          type="submit"
                          className="w-100 mb-3 fb"
                        >
                          <GrFacebookOption />
                          &#10240;Login With Facebook
                        </Button>
                        <Button
                          variant="light"
                          type="submit"
                          className="w-100 google"
                        >
                          <AiOutlineGoogle />
                          &#10240;Login With Google
                        </Button>
                      </Form>
                      <div className="bottom-link">
                        <Link href={"/"}>Forgot your password</Link>
                        <br />
                        <Link href={"/register"}>Create account</Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}
