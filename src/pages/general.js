/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";
import CardDesign from "@/components/cardDesign/CardDesign";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import MemberSkeleton from "@/components/loader/MemberSkeleton";

export default function General() {
  const { data, loading } = useFetch("/member/Member");
  return (
    <>
      <Head>
        <title>GENERAL MEMBER::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <MemberSkeleton />
        ) : (
          <>
            {/* General Member Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">General Member</h3>
            </div>
            {/* General Member Details */}
            <Container className="mt-4">
              <Row>
                {data?.data?.map((item) => (
                  <CardDesign key={item.id} item={item} />
                ))}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
