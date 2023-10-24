/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";
import CardDesign from "@/components/cardDesign/CardDesign";

const inter = Inter({ subsets: ["latin"] });

export default function LifeMember() {
  const { data, loading } = useFetch("/member/Life_Member");
  return (
    <>
      <Head>
        <title>Dhaka University Chemistry Alumni Association Life Member</title>
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
            {/* Life Member Title */}
            <div className="headerTitle mt-4">
              <h3 class="headerTitleMain">Life Member</h3>
            </div>
            {/* Life Member Details */}
            <Container className="mt-2">
              <Row>
                {data?.data.map((item) => (
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
