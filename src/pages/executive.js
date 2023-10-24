/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import CardDesign from "@/components/cardDesign/CardDesign";

const inter = Inter({ subsets: ["latin"] });

export default function Executive() {
  const { data, loading } = useFetch("/member/Executive");
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
          <div className="loadingContainer">
            <img src="./loading.gif" alt="" className="loadingGif" />
          </div>
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
                  <CardDesign key={item.serial} item={item} />
                ))}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
