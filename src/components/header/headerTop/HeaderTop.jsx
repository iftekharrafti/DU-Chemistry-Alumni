import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FiPhoneCall } from "react-icons/fi";
import { BsFillEnvelopeFill } from "react-icons/bs";
import Style from "./headerTop.module.css";
import Link from "next/link";

const HeaderTop = () => {
  return (
    <div className={Style.headerTop}>
      <Container>
        <Row className="py-1 d-flex align-items-center">
          <Col md={6}>
            <div className="d-flex">
              <div>
                <FiPhoneCall className={`${Style.icon} me-1`} />
                <span className={Style.text}>+74837483748</span>
              </div>
              <div className="ms-3">
                <BsFillEnvelopeFill className={`${Style.icon} me-1`} />
                <span className={Style.text}>jekono@gmail.com</span>
              </div>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <div className="d-flex">
              <Link href="/register" className={Style.link}>
                <Button
                  className="d-flex align-items-center"
                  size="sm"
                  style={{
                    background: "rgb(255, 198, 0)",
                    color: "black",
                    padding: "4px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Membership Application
                </Button>
              </Link>
              <Link href="/login" className={Style.link}>
                <Button className="d-flex align-items-center ms-2" size="sm" style={{
                    background: "rgb(255, 198, 0)",
                    color: "black",
                    padding: "4px 10px",
                    borderRadius: "5px",
                  }}>
                  Login
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderTop;
