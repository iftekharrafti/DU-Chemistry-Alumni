/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import CardDesign from "@/components/cardDesign/CardDesign";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import MemberSkeleton from "@/components/loader/MemberSkeleton";

export default function Executive() {
  const { data, loading } = useFetch("/member/11");
  return (
    <>
      <Head>
        <title>EXECUTIVE::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <MemberSkeleton />
        ) : (
          <>
            {/* Executive Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Executive</h3>
            </div>
            {/* Executive Details */}
            <Container className="">
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
