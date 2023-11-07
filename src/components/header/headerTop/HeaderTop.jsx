/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FiPhoneCall } from "react-icons/fi";
import { BsFillEnvelopeFill } from "react-icons/bs";
import Style from "./headerTop.module.css";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import Cookies from "js-cookie";

const HeaderTop = () => {
  const [cookies, setCookies] = useState(null);
  const [itemValue, setItemValue] = useState(null);
  const { data, loading } = useFetch("/home");

  useEffect(() =>{
    const storedCookies = Cookies.get("TOKEN_LOGIN");
    setCookies(storedCookies);
    if(cookies){
      const storedValue = localStorage.getItem("user-info");
      setItemValue(storedValue)
    }
  },[])

  return (
    <div className={Style.headerTop}>
      <Container>
        <Row className="py-1 d-flex align-items-center">
          <Col md={6}>
            {/* Phone Number and Email */}
            <div className="d-flex">
              <div>
                <FiPhoneCall className={`${Style.icon} me-1`} />
                <span className={Style.text}>{data?.admin?.mobile}</span>
              </div>
              <div className="ms-3">
                <BsFillEnvelopeFill className={`${Style.icon} me-1`} />
                <span className={Style.text}>{data?.admin?.email}</span>
              </div>
            </div>
          </Col>

          {/* Member application and Login Button & Dashboard */}
          <Col md={6} className="d-flex justify-content-end">
            <div className="d-flex">
              {cookies ? (
                <Link href="/dashboard" className={Style.link}>
                  <button
                    className={`${Style.headerTopButton} d-flex align-items-center ms-2`}
                    size="sm"
                  >
                    Dashboard
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/application" className={Style.link}>
                    <button
                      className={`${Style.headerTopButton} d-flex align-items-center ms-2`}
                      size="sm"
                    >
                      Membership Application
                    </button>
                  </Link>
                  <Link href="/login" className={Style.link}>
                    <button
                      className={`${Style.headerTopButton} d-flex align-items-center ms-2`}
                      size="sm"
                    >
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderTop;
