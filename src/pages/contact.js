/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Col, Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import EventSkeleton from "@/components/loader/Event";

export default function Journey() {
  const { data, loading } = useFetch("/notice/Contact");
  return (
    <>
      <Head>
        <title>CONTACT::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <EventSkeleton />
        ) : (
          <>
            {/* Notice Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Contact Us</h3>
            </div>
            {/* Notice Details */}
            <Container className="">
              <Row className="mb-4">
                <Col md={8} sm={10} className="mx-auto">
                  <p
                    dangerouslySetInnerHTML={{ __html: data?.data[0]?.text }}
                  />
                </Col>
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
