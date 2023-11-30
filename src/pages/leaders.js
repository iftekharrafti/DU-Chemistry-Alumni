/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import CardDesign from "@/components/cardDesign/CardDesign";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { TITLE } from "@/utils/api";

export default function Leaders() {
  const { data, loading } = useFetch("/expre");
  return (
    <>
      <Head>
        <title>LEADERS::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Executive Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Executive</h3>
            </div>
            {/* Executive Details */}
            <Container className="mt-4">
              <Row>
                {data?.data.map((item) => (
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
