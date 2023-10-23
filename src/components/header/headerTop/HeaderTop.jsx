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
                +74837483748
              </div>
              <div className="ms-3">
                <BsFillEnvelopeFill className={`${Style.icon} me-1`} />
                jekono@gmail.com
              </div>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <div>
              <Button size="sm">Membership Application</Button>
              <Link href="/login">
                <Button size="sm" className="ms-2">
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
