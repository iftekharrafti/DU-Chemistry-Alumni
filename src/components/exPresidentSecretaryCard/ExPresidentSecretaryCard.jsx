import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Img from "../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "./exPresidentSecretaryCard.module.css";
import { BsFacebook } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import QuickViewModal from "../quickViewModal/QuickViewModal";

const ExPresidentSecretaryCard = ({ item }) => {
  const [modalShow, setModalShow] = useState(false);

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


        {/* Show Modal for full details */}
        <QuickViewModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          item={item}
        />
      </div>
    </Col>
  );
};

export default ExPresidentSecretaryCard;
