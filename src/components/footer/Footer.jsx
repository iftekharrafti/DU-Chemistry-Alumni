/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Style from "./footer.module.css";
import { BiSolidEditLocation } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsTwitter, BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const Footer = () => {
  const { data, loading } = useFetch("/home");
  return (
    <footer className={Style.footer}>
      <Container>
        <Row>
          <Col lg={3} md={6} sm={6}>
            <h4 className={Style.title}>Address</h4>
            <div>
              <ul className={`${Style.footerItems} p-0`}>
                <li
                  className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                >
                  <BiSolidEditLocation className={Style.footerIcon} />
                  <span>{data?.admin?.address}</span>
                </li>
                <li
                  className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                >
                  <BsFillTelephoneFill className={Style.footerIcon} />
                  <span>{data?.admin?.mobile}</span>
                </li>
                <li
                  className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                >
                  <BsFillEnvelopeFill className={Style.footerIcon} />
                  <span>{data?.admin?.email}</span>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <h4 className={Style.title}>Quick Links</h4>
            <div>
              <ul className={`${Style.footerItems} p-0`}>
                <Link href="/journey" className={Style.footerLink}>
                  <li
                    className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                  >
                    <BsArrowRightCircleFill className={Style.footerIcon} />
                    <span>About Us</span>
                  </li>
                </Link>
                <Link href="/" className={Style.footerLink}>
                  <li
                    className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                  >
                    <BsArrowRightCircleFill className={Style.footerIcon} />
                    <span>Privacy Policy</span>
                  </li>
                </Link>
                <Link href="/" className={Style.footerLink}>
                  <li
                    className={`${Style.footerItem} d-flex align-items-center p-0 mb-2`}
                  >
                    <BsArrowRightCircleFill className={Style.footerIcon} />
                    <span>Terms & Condition</span>
                  </li>
                </Link>
                <li
                  className={`${Style.footerItem} ${Style.footerLink} d-flex align-items-center p-0 mb-2`}
                >
                  <BsArrowRightCircleFill className={Style.footerIcon} />
                  <a
                    href="https://laravel.amaderthikana.com/admin/login"
                    target="_blank"
                    className={Style.footerLink}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4} md={6} sm={6}className="mb-3">
            <h4 className={Style.title}>Our Social Networks</h4>
            <div className={Style.footerSocialIcons}>
              <div className={Style.footerSocialIcon}>
                <BsTwitter />
              </div>
              <div className={Style.footerSocialIcon}>
                <BsFacebook />
              </div>
              <div className={Style.footerSocialIcon}>
                <BsYoutube />
              </div>
              <div className={Style.footerSocialIcon}>
                <BsLinkedin />
              </div>
            </div>
          </Col>
          <Col lg={2} md={6} sm={6} >
            <h4 className={Style.title}>Developed By</h4>
            <a href="http://ancovabd.com/" target="_blank">
              <img src="./ancovabr.png" alt="" className={Style.ancovaLogo} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
