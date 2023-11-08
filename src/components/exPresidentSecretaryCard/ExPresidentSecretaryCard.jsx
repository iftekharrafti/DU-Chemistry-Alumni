import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Img from "../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "./exPresidentSecretaryCard.module.css";

const ExPresidentSecretaryCard = ({ item }) => {

  return (
    <Col lg={4} md={6} sm={12}>
        {/* Show executive card details */}
      <div className={Style.cardDesign} data-aos="fade-up">
        {item?.profile_image !== null ? (
          <Img src={baseImgUrl + item?.image} className={Style.cardImg} />
        ) : (
          <Img src="/default.png" className={Style.cardImg} />
        )}

        <h4 className={Style.name}>{item?.name}</h4>
        <h6>{item?.date1} to {item?.date2}</h6>

      </div>
    </Col>
  );
};

export default ExPresidentSecretaryCard;
