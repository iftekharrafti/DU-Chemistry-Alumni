/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Col, Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import EventSkeleton from "@/components/loader/Event";

export default function Journey() {
  const { data, loading } = useFetch("/notice/Document");
  return (
    <>
      <Head>
        <title>DOCUMENT::Dhaka University Chemistry Alumni Association</title>
        <meta name="description" content="Dhaka University Chemistry Alumni Association" />
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
              <h3 class="headerTitleMain">Document of DUCAA</h3>
            </div>
            {/* Notice Details */}
            <Container className="">
              <Row className="mb-4">
                <Col md={10} sm={12}>
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
