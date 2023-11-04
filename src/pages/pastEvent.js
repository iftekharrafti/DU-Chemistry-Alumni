/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiSolidCalendar } from "react-icons/bi";
import Link from "next/link";
import Style from "@/styles/event.module.css";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import EventSkeleton from "@/components/loader/Event";

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
        <title>PAST EVENT::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
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
                      <Link href={`/pastEvent/${item?.id}`}>
                        <Button
                          style={{
                            background: "rgb(255, 198, 0)",
                            border: "1px solid rgb(255, 198, 0)",
                            fontWeight: "bold",
                            padding: "4px 15px",
                            marginTop: "15px",
                          }}
                        >
                          View Details
                        </Button>
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
