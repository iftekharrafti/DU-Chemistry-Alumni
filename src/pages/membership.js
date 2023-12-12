/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Col, Container, Row } from "react-bootstrap";
import EventSkeleton from "@/components/loader/Event";
import { TITLE } from "@/utils/api";

export default function Membership() {
  const { data, loading } = useFetch("/notice/Membership");
  return (
    <>
      <Head>
        <title>MEMBERSHIP::{TITLE}</title>
        <meta name="description" content={TITLE} />
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
              <h3 class="headerTitleMain">Membership Guideline</h3>
            </div>
            {/* Notice Details */}
            <Container className="">
              <Row className="mb-4">
                <Col md={10} sm={12} data-aos="fade-up">
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
