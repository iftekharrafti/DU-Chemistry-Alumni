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

              <h4 className={Style.title}>{data?.homecount?.row1?.category}</h4>
              <CountUp
                start={0}
                end={data?.homecount?.row1?.count}
                clssName={Style.countUpText}
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} data-aos="zoom-in" className="mb-4">
            <div className={Style.countUp}>
              <FaUsersCog className={Style.icon} />
              <h4 className={Style.title}>{data?.homecount?.row2?.category}</h4>
              <CountUp
                start={0}
                end={data?.homecount?.row2?.count}
                clssName={Style.countUpText}
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} data-aos="zoom-in" className="mb-4">
            <div className={Style.countUp}>
              <FaUsers className={Style.icon} />
              <h4 className={Style.title}>{data?.homecount?.row3?.category}</h4>
              <CountUp
                start={0}
                end={data?.homecount?.row3?.count}
                clssName={Style.countUpText}
              />
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} data-aos="zoom-in" className="mb-4">
            <div className={Style.countUp}>
              <FaCheck className={Style.icon} />
              <h4 className={Style.title}>{data?.homecount?.row4?.category}</h4>
              <CountUp
                start={0}
                end={data?.homecount?.row4?.count}
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
