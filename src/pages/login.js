/* eslint-disable react/jsx-no-duplicate-props */
import Head from "next/head";
import Image from "next/image";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Style from "@/styles/login.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  // const { data, loading } = useFetch("/home");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLoggedIn = useAuth();

  if (isLoggedIn) {
    router.push('/dashboard')
    return null;
  }

  const url = BASE_URL + "/member_login";

  // Define a function to fetch user info
  const fetchUserInfo = async () => {
    try {
      const cookieValue = Cookies.get("TOKEN_LOGIN");

      axios
        .get(BASE_URL + "/member_profile", {
          headers: {
            // Set your cookie in the request headers
            TOKEN_LOGIN: cookieValue,
          },
        })
        .then((response) => {
          const profileData = {
            name: response?.data?.data?.name,
            email: response?.data?.data?.email,
            phone: response?.data?.data?.phone,
            profile_image: response?.data?.data?.profile_image,
          };
          localStorage.setItem("user-info", JSON.stringify(profileData));
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Login form
  const handleLoginSubmit = async (data) => {
    setLoadingBtn(true);
    try {
      const newData = {
        email: data.email,
        member_password: data.password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(url, newData, { headers });

      if (response.status === 200) {
        if (response.data.status === 200) {
          Cookies.set("TOKEN_LOGIN", response.data.TOKEN_LOGIN, { expires: 2 });

          // Call the useUserInfo hook to fetch user info
          await fetchUserInfo();

          toast.success("Login Successful");
          setLoadingBtn(false);
          router.push("/dashboard");
          
        } else if (
          response.data.status === 700 ||
          response.data.status === 300 ||
          response.data.status === 400 ||
          response.data.status === 500 ||
          response.data.status === 600 ||
          response.data.status === 800 ||
          response.data.status === 900 
        ) {
          toast.error(response.data.message);
          setLoadingBtn(false);
        } else {
          toast.error("Something went wrong");
          setLoadingBtn(false);
        }
      }
    } catch (err) {
      
      setLoadingBtn(false);
    }

    
  };

  // Password hide and show
  const showHidePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Head>
        <title>LOGIN::Dhaka University Chemistry Alumni Association</title>
        <meta name="description" content="{data?.admin?.nameen}" />
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
                  <div className="headerTitle mt-0 mb-0">
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
                        <span className="text-danger">Email is required</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <div className={Style.passwordField}>
                        <Form.Control
                          type={isPasswordVisible ? "text" : "password"}
                          className={`${Style.inputField} remove-focus`}
                          {...register("password", {
                            required: true,
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
                    <Link href="/forgottenPassword">
                      <p>Forgotten Password?</p>
                    </Link>

                    {/* Submit Button */}
                    {loadingBtn ? (
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled
                      >
                        Loading...
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                      >
                        Sign In
                      </Button>
                    )}
                  </Form>
                  <p className="text-center mt-3">
                    Don&apos;t have an account?{" "}
                    <Link href="/application">Application Now</Link>
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
