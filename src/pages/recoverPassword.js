/* eslint-disable react/jsx-no-duplicate-props */
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Style from "@/styles/login.module.css";
import { useState } from "react";
import { BASE_URL, TITLE } from "@/utils/api";

export default function RecoverPassword() {
  const [loadingBtn, setLoadingBtn] = useState(false);

  return (
    <>
      <Head>
        <title>RECOVERY PASSWORD::{TITLE}</title>
        <meta name="description" content={TITLE} />
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
                  <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="password"
                        className={`${Style.inputField} remove-focus`}
                        placeholder="Enter New Password"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="password"
                        className={`${Style.inputField} remove-focus`}
                        placeholder="Confirm Password"
                      />
                    </Form.Group>

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
                        Submit
                      </Button>
                    )}
                  </Form>
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </main>
    </>
  );
}
