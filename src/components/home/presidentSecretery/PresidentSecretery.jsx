import Img from "@/components/lazyLoadImage/Img";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Style from "./presidentSecretery.module.css";
import { baseImgUrl } from "@/utils/imgUrl";

const PresidentSecretary = ({ data, loading }) => {
  return (
    <div className={Style.presidentSecretery}>
      <Container>
        {data?.welcome?.map((item) => {
          return (
            <Row className="mb-5" key={item.serial}>
              <Col lg={4} md={12} sm={12} className='d-flex align-items-center justify-content-center' data-aos="fade-right">
                <div className={Style.imgContent}>
                <Img
                  src={
                    baseImgUrl +
                    item?.image
                  }
                  className={Style.img}
                />
                </div>
              </Col>
              <Col lg={8} md={12} sm={12} data-aos="fade-left">
                <div Style={Style.content}>
                  <h2 className={Style.title}>{item?.title}</h2>
                  <p className={Style.text1}>{item?.text1}</p>
                  <div className="ms-4">

                  <h4 className={Style.name}>{item?.name}</h4>
                  <h5 className={Style.workplace}>
                    {item?.workplace}
                  </h5>
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
};

export default PresidentSecretary;
