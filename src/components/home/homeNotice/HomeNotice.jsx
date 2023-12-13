/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button, Col, Container } from "react-bootstrap";
import { baseImgUrl } from "@/utils/imgUrl";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import Style from "./homeNotice.module.css";
import Img from "@/components/lazyLoadImage/Img";

const HomeNotice = ({ noticeData }) => {
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
    <div>
      {/* Notice Title */}
      <div className="headerTitle" style={{height: '3vh'}}>
        <h3 class="headerTitleMain">Notice</h3>
      </div>
      <Container>
        <Swiper style={{padding: "20px 10px"}}
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {noticeData?.map((notice) => (
            <SwiperSlide key={notice.id}>
              <div className={Style.cardDesign}>
                <Link href={`/notice/${notice.id}`}>
                  {notice?.image !== null ? (
                    <Img
                      src={baseImgUrl + notice?.image}
                      className={`${Style.cardImg} img-fluid`}
                    />
                  ) : (
                    <img
                      src="/department.jpg"
                      className={`${Style.cardImg} img-fluid`}
                    />
                  )}
                </Link>
                <div className={Style.date}>
                  <MdDateRange style={{ color: "#009CFF" }} />
                  <span className="ms-2">{formatDateString(notice?.date)}</span>
                </div>
                <Link
                  href={`/notice/${notice.id}`}
                  className="text-black text-decoration-none"
                >
                  <h4 className={Style.title}>{notice?.title}</h4>
                </Link>
                <Link href={`/notice/${notice.id}`} className="d-flex justify-content-center text-decoration-none">
                  <button className={Style.button}>Read more</button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          
        </Swiper>
      </Container>
    </div>
  );
};

export default HomeNotice;
