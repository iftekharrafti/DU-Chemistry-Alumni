/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiSolidCalendar } from "react-icons/bi";
import { useRouter } from "next/router";
import Style from "@/styles/event.module.css"

const inter = Inter({ subsets: ["latin"] });

export default function Notice() {
  const { data, loading } = useFetch("/notice/Notice");

  const router = useRouter();
  const { id } = router.query;

  const event = data?.data?.find((item) => item?.id === parseInt(id));

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
        <title>NOTICE DETAILS::{data?.admin?.nameen}</title>
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
            {/* Notice Details */}
            <Container className="mt-4">
              <Row className="mb-4">
                <Col
                  lg={10}
                  md={10}
                  sm={12}
                  className="mx-auto"
                >
                  <h3 className={Style.title}>
                    {event?.title}
                  </h3>
                  <div className="d-flex align-items-center">
                    <BiSolidCalendar className={Style.icon}
                    />
                    <span className="ms-1">
                      Published on: {formatDateString(event?.date)}
                    </span>
                  </div>
                  <p
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: event?.text }}
                  ></p>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}