/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import Style from "@/styles/presidentDetails.module.css";
import { TITLE } from "@/utils/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { baseImgUrl } from "@/utils/imgUrl";

export default function Details() {
  const [noticeLoading, setNoticeLoading] = useState(false);
  const { data, loading } = useFetch("/home");

  const router = useRouter();
  const { presidentID } = router.query;

  useEffect(() => {
    const fetchNotice = async () => {
      setNoticeLoading(true);
      const fetchedEvent = data?.welcome?.find(
        (item) => item?.id === parseInt(presidentID)
      );
      setEvent(fetchedEvent);
      setNoticeLoading(false);
    };

    fetchNotice();
  }, [presidentID, data]);

  const [event, setEvent] = useState(null);

  return (
    <>
      <Head>
        <title>PRESIDENT - SECRETERY DETAILS::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        {loading || noticeLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Notice Details */}
            <Container className="mt-4 mb-4">
              <div className="shadow px-4 py-4">
                <Row className="mb-4">
                  <Col md={3} sm={12}>
                    <img className={Style.img} src={baseImgUrl + event?.image} alt="" />
                  </Col>
                  <Col md={9} sm={12}>
                    <div
                      className="mt-4"
                    >
                      <h4 className={Style.name}>{event?.name}</h4>
                      <h5 className={Style.workplace}>{event?.workplace}</h5>
                    </div>
                  </Col>
                  <Col md={12} sm={12}>
                    <div className="mt-4">
                      <p className={Style.description}>{event?.text1}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
