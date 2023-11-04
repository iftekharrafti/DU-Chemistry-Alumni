import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Img from "../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "./cardDesign.module.css";
import { BsLink45Deg } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import QuickViewModal from "../quickViewModal/QuickViewModal";

const CardDesign = ({ item }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Col lg={4} md={6} sm={12} data-aos="fade-up">
        {/* Show executive card details */}
      <div className={Style.cardDesign} data-aos="fade-up">
        {item?.profile_image !== null ? (
          <Img src={baseImgUrl + item?.profile_image} className={Style.cardImg} />
        ) : (
          <Img src="/default.png" className={Style.cardImg} />
        )}

        <h4 className={Style.name}>{item?.name}</h4>
        {
          item?.category === "Executive" && <h6>{item?.designation}</h6>
        }
        <p className={Style.text}>{item?.text1}</p>
        <div className={Style.icons}>
          <div className={Style.icon}>
            <a href={item?.web_link}>
              <BsLink45Deg />
            </a>
          </div>
          <div className={Style.icon} onClick={() => setModalShow(true)}>
            <BsFillEyeFill />
          </div>
          <div className={Style.icon}>
            <a href="https://www.instagram.com/">
              <BsInstagram />
            </a>
          </div>
        </div>

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

export default CardDesign;
