/* eslint-disable react/jsx-no-duplicate-props */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Style from "@/styles/login.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { data, loading } = useFetch("/home");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Login form
  const handleLoginSubmit = (data) => {
    logInUser(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        toast.success("Login Successfull");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Password hide and show
  const showHidePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Head>
        <title>LOGIN::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main style={{ background: "#EDF0F2" }}>
        <Container>
          <Row>
            <div
              className="d-flex justify-content-center mb-5 mt-4"
              style={{ width: "100%" }}
            >
              <Col lg={4} md={7} sm={7}>
                <div
                  style={{
                    background: "#fff",
                    padding: "50px 50px",
                    borderRadius: "20px",
                  }}
                >
                  {/* Form header and login Form data */}
                  {/* Title */}
                  <div className="headerTitle">
                    <h3
                      class="headerTitleMain"
                      style={{ fontFamily: "Merriweather" }}
                    >
                      Login
                    </h3>
                  </div>
                  <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="email"
                        className={`${Style.inputField} remove-focus`}
                        {...register("email", { required: true })}
                        placeholder="Email Address"
                      />
                      {errors.email && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <div className={Style.passwordField}>
                        <Form.Control
                          type={isPasswordVisible ? "text" : "password"}
                          className={`${Style.inputField} remove-focus`}
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                          placeholder="Password"
                        />
                        {isPasswordVisible ? (
                          <span className={Style.passwordIconDiv}>
                            <AiOutlineEye
                              className={Style.passwordIcon}
                              onClick={showHidePassword}
                            />
                          </span>
                        ) : (
                          <span className={Style.passwordIconDiv}>
                            <AiOutlineEyeInvisible
                              className={Style.passwordIcon}
                              onClick={showHidePassword}
                            />
                          </span>
                        )}
                      </div>
                      {errors.password && (
                        <span className="text-danger">
                          Password Must be atleast 6 characters
                        </span>
                      )}
                    </Form.Group>
                    <Link href="/resetPassword">
                      <p>Forgot Password?</p>
                    </Link>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ width: "100%" }}
                    >
                      Sign In
                    </Button>
                  </Form>
                  <p className="text-center mt-3">
                    Don&apos;t have an account?{" "}
                    <Link href="/register">Register Now</Link>
                  </p>
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </main>
    </>
  );
}
