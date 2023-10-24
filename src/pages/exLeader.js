/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";
import CardDesign from "@/components/cardDesign/CardDesign";

const inter = Inter({ subsets: ["latin"] });

export default function Executive() {
  const { data, loading } = useFetch("/expre");
  return (
    <>
      <Head>
        <title>EX LEADERS::{data?.admin?.nameen}</title>
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
            {/* ex Leader Title */}
            <div className="headerTitle ">
              <h3 class="headerTitleMain">Ex Leader</h3>
            </div>
            {/* Ex Leader Details */}
            <Container className="mt-2">
              <Row>
                {data?.data1?.map((item) => (
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
