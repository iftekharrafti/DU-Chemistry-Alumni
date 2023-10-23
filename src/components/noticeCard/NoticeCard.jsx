import React from "react";
import { Button, Col } from "react-bootstrap";
import Img from "../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "./noticeCard.module.css";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";

const NoticeCard = ({ item }) => {
  return (
    <Col lg={4} md={6} sm={12} data-aos="fade-up">
      <div className={Style.cardDesign}>
        <Link href={`/notice/${item.id}`}>
          <Img
            src={baseImgUrl + item?.image}
            className={`${Style.cardImg} img-fluid`}
          />
        </Link>
        <div className={Style.date}>
            <MdDateRange style={{color: '#009CFF'}} />
            <span className="ms-2">19 oct, 2023</span>
        </div>
        <Link
          href={`/notice/${item.id}`}
          className="text-black text-decoration-none"
        >
          <h4 className={Style.title}>{item?.title}</h4>
        </Link>
        <Link href={`/notice/${item.id}`}>
          <Button className={Style.button}>বিস্তারিত দেখুন</Button>
        </Link>
      </div>
    </Col>
  );
};

export default NoticeCard;
