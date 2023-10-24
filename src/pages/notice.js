/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";

const inter = Inter({ subsets: ["latin"] });

export default function Notice() {
  const { data, loading } = useFetch("/notice/Notice");
  return (
    <>
      <Head>
        <title>NOTICE::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <div className="loadingContainer">
            <img src="./loading.gif" alt="" className="loadingGif" />
          </div>
        ) : (
          <>
            {/* Notice Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">নোটিশ</h3>
            </div>
            {/* Notice Details */}
            <Container className="mt-2">
              <Row className="mb-4">
                {data?.data.map((item) => (
                  <NoticeCard key={item.serial} item={item} />
                ))}
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
