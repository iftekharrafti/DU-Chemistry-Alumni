/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import ExPresidentSecretaryCard from "@/components/exPresidentSecretaryCard/ExPresidentSecretaryCard";
import MemberSkeleton from "@/components/loader/MemberSkeleton";
import { TITLE } from "@/utils/api";

export default function Executive() {
  const { data, loading } = useFetch("/expre");
  return (
    <>
      <Head>
        <title>EX LEADERS::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <MemberSkeleton />
        ) : (
          <>
            {/* Ex President Title */}
            <div className="headerTitle ">
              <h3 class="headerTitleMain">Ex President</h3>
            </div>

            <Container className="mt-2">
              <Row>
                {/* Ex President Details */}
                {data?.data1?.map((item) => (
                  <ExPresidentSecretaryCard key={item.id} item={item} />
                ))}

                {/* Ex Secretary Title */}
                <div className="headerTitle ">
                  <h3 class="headerTitleMain">Ex Secretary</h3>
                </div>

                {/* Ex Secretary Details */}
                {data?.data2?.map((item) => (
                  <ExPresidentSecretaryCard key={item.id} item={item} />
                ))}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
