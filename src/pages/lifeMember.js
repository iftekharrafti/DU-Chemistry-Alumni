/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import CardDesign from "@/components/cardDesign/CardDesign";
import MemberSkeleton from "@/components/loader/MemberSkeleton";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import { TITLE } from "@/utils/api";

export default function LifeMember() {
  const [page, setPage] = useState(1);
  const { data, loading } = useFetch(`/member/8?page=${page}`);

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
        <title>LIFE MEMBER::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <MemberSkeleton />
        ) : (
          <>
            {/* Life Member Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Life Member</h3>
            </div>
            {/* Life Member Details */}
            <Container className="mt-2">
              <Row>
                {data?.data.map((item) => (
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
