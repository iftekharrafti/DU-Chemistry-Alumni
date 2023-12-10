import React from "react";
import { Button, Col } from "react-bootstrap";
import { BiSolidCalendar } from "react-icons/bi";
import Link from "next/link";
import Style from "@/styles/event.module.css";

const UpcomingEvent = ({ item }) => {
  //   Convert Date
  const formatDateString = (inputDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };
  return (
    <Col
      lg={10}
      md={10}
      sm={12}
      className="mx-auto"
      key={item?.id}
      data-aos="fade-up"
      et
    >
      <h3 className={Style.title}>{item?.title}</h3>
      <div className="d-flex align-items-center">
        <BiSolidCalendar className={Style.icon} />
        <span className="ms-1">
          Published on: {formatDateString(item?.date)}
        </span>
      </div>
      <Link href={`/upcomingEvent/${item?.id}`}>
        <Button className={Style.button}>View Details</Button>
      </Link>
      <hr />
    </Col>
  );
};

export default UpcomingEvent;
