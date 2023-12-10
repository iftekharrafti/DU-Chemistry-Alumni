/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import EventSkeleton from "@/components/loader/Event";
import { TITLE } from "@/utils/api";
import UpcomingEvent from "@/components/upcomingEvent/UpcomingEvent";

export default function Notice() {
  const { data, loading } = useFetch("/notice/Upcoming");

  return (
    <>
      <Head>
        <title>UPCOMING EVENT::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <EventSkeleton />
        ) : (
          <>
            {/* Upcoming Event Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Upcoming Events</h3>
            </div>
            {/* Upcoming Event Details */}
            <Container className="mt-0">
              <Row className="mb-4">
                {data?.data?.map((item) => <UpcomingEvent key={item.id} item={item} /> )}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
