/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Col, Container, Row } from "react-bootstrap";
import Style from "@/styles/dashboard/dashboard.module.css";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { TITLE } from "@/utils/api";


export default function Dashboard() {


  const { data, loading } = useFetch("/notice/Dashboard");

  return (
    <>
      <Head>
        <title>DASHBOARD::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>

            <div className={`${Style.mainContainer} d-flex`}>
              {/* Dashboard Left Side and Header */}
              <DashboardLeftSide />
              
              {/* Main Content */}
              <div className={`${Style.content} px-4`}>
              <Row className="mb-4 mt-4">
                <Col md={10} sm={12}>
                  <p
                    dangerouslySetInnerHTML={{ __html: data?.data[0]?.text }}
                  />
                </Col>
              </Row>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
