import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCertificate, FaUsersCog, FaUsers, FaCheck } from "react-icons/fa";
import CountUp from "react-countup";
import Style from "./homeCountUp.module.css";

const HomeCountUp = ({ data }) => {
  return (
    <div className={Style.countUpMain}>
      <Container>
        <Row>
          <Col lg={3} md={6} sm={12} data-aos="zoom-in" className="mb-4">
            <div className={Style.countUp}>
              <FaCertificate className={Style.icon} />

              <h4 className={Style.title}>কার্যনির্বাহী কমিটি</h4>
              <CountUp
                start={0}
                end={data?.homecount?.executive}
                clssName={Style.countUpText}
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} data-aos="zoom-in" className="mb-4">
            <div className={Style.countUp}>
              <FaUsersCog className={Style.icon} />
              <h4 className={Style.title}>সাধারণ সদস্য</h4>
              <CountUp
                start={0}
                end={data?.homecount?.general}
                clssName={Style.countUpText}
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} data-aos="zoom-in" className="mb-4">
            <div className={Style.countUp}>
              <FaUsers className={Style.icon} />
              <h4 className={Style.title}>উপদেষ্টা মন্ডলী</h4>
              <CountUp
                start={0}
                end={data?.homecount?.advisor}
                clssName={Style.countUpText}
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} data-aos="zoom-in" className="mb-4">
            <div className={Style.countUp}>
              <FaCheck className={Style.icon} />
              <h4 className={Style.title}>সিনিয়র সদস্য</h4>
              <CountUp
                start={0}
                end={data?.homecount?.senior}
                clssName={Style.countUpText}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeCountUp;
