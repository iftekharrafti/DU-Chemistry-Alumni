/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiSolidCalendar } from "react-icons/bi";
import Link from "next/link";
import Style from "@/styles/event.module.css";
import EventSkeleton from "@/components/loader/Event";
import { TITLE } from "@/utils/api";

export default function Notice() {
  const { data, loading } = useFetch("/notice/Past");

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
    <>
      <Head>
        <title>PAST EVENT::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <EventSkeleton />
        ) : (
          <>
            {/* Past Event Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Past Events</h3>
            </div>
            {/* Past Event Details */}
            <Container className="mt-0">
              <Row className="mb-4">
                {data?.data?.map((item) => {
                  return (
                    <Col
                      lg={10}
                      md={10}
                      sm={12}
                      className="mx-auto"
                      key={item?.id}
                      data-aos="fade-up"
                    >
                      <h3 className={Style.title}>{item?.title}</h3>
                      <div className="d-flex align-items-center">
                        <BiSolidCalendar className={Style.icon} />
                        <span className="ms-1">
                          Published on: {formatDateString(item?.date)}
                        </span>
                      </div>
                      <Link href={`/pastEvent/${item?.id}`} className="d-flex text-decoration-none mt-2">
                        <button className={Style.button}
                        >
                          Read more
                        </button>
                      </Link>
                      <hr />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
