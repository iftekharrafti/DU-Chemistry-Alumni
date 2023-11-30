/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";
import MemberSkeleton from "@/components/loader/MemberSkeleton";
import { TITLE } from "@/utils/api";

export default function Notice() {
  const { data, loading } = useFetch("/notice/Notice");
  return (
    <>
      <Head>
        <title>NOTICE::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <MemberSkeleton />
        ) : (
          <>
            {/* Notice Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Notice</h3>
            </div>
            {/* Notice Details */}
            <Container className="mt-2">
              <Row className="mb-4">
                {data?.data?.map((item) => (
                  <NoticeCard key={item.id} item={item} />
                ))}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
