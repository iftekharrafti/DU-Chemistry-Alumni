/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiSolidCalendar } from "react-icons/bi";
import Link from "next/link";
import Style from "@/styles/event.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Notice() {
  const { data, loading } = useFetch("/notice/Upcoming");

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
        <title>UPCOMING EVENT::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <div className="loadingContainer">
            <img src="./loading.gif" alt="" className="loadingGif" />
          </div>
        ) : (
          <>
            {/* Upcoming Event Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Upcoming Events</h3>
            </div>
            {/* Upcoming Event Details */}
            <Container className="mt-0">
              <Row className="mb-4">
                {data?.data?.map((item) => {
                  return (
                    <Col
                      lg={10}
                      md={10}
                      sm={12}
                      className="mx-auto"
                      key={item?.serial}
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
                })}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}