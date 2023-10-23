/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Col, Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";

const inter = Inter({ subsets: ["latin"] });

export default function Journey() {
  const { data, loading } = useFetch("/notice/Contact");
  return (
    <>
      <Head>
        <title>Dhaka University Chemistry Alumni Association Contact</title>
        <meta name="description" content="Generated by create next app" />
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
          {/* Notice Title */}
            <div className="headerTitle mt-4">
              <h3 class="headerTitleMain">Contact Us</h3>
            </div>
            {/* Notice Details */}
            <Container className="">
              <Row className="mb-4">
                <Col md={8} sm={10} className="mx-auto">
                    <p dangerouslySetInnerHTML={{__html: data?.data[0]?.text}} />
                </Col>
              </Row>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
