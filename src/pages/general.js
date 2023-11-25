/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import NoticeCard from "@/components/noticeCard/NoticeCard";
import CardDesign from "@/components/cardDesign/CardDesign";
import MemberSkeleton from "@/components/loader/MemberSkeleton";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";

export default function General() {
  const [page, setPage] = useState(1);
  const { data, loading } = useFetch(`/member/9?page=${page}`);

  const handleNextPage = () => {
    if(page>=data?.last_page){
      setPage(data?.last_page)
    }
    setPage(page + 1);
  }
  const handlePrevPage = () => {
    if(page <= 0){
      setPage(1)
    }
    setPage(page - 1);
  }
  return (
    <>
      <Head>
        <title>GENERAL MEMBER::Dhaka University Chemistry Alumni Association</title>
        <meta name="description" content="Dhaka University Chemistry Alumni Association" />
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
              <div>
                <Pagination page={data?.page} last_page={data?.last_page} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}></Pagination>
              </div>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
