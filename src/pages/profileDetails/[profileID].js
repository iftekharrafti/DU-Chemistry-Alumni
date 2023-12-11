/* eslint-disable @next/next/no-img-element */
import { baseImgUrl } from "@/utils/imgUrl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Style from "@/styles/profileDetails.module.css";
import Head from "next/head";
import axios from "axios";
import { BASE_URL, TITLE } from "@/utils/api";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

const ProfileDetails = () => {
  const [data, setData] = useState({});
  const[loading, setLoading] = useState(false);

  const router = useRouter();
  const { profileID } = router.query;

  useEffect(() => {
    setLoading(true);
    axios.get(BASE_URL + `/viewmember/${profileID}`).then((response) => {
      if(response?.data?.data[0]){

        setData(response?.data?.data[0]);
        setLoading(false);
      }
    });
  }, [profileID]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div style={{ background: "#EDF0F2", padding: "1px 0 30px 0" }}>
            <Container>
              <div
                style={{
                  background: "#fff",
                  padding: "25px 25px",
                  margin: "40px 0",
                }}
              >
                <Row>
                  <Col md={4} sm={12} style={{width: '340px'}}>
                    <img
                      src={baseImgUrl + data?.profile_image}
                      className={Style.profileImg}
                      alt="instructor"
                      // className="img-fluid"
                      style={{ width: "100%" }}
                    />
                    <div
                      style={{ background: "#EDF0F2", marginBottom: "30px" }}
                    >
                      <div
                        className="w-100 text-center text-white py-1"
                        style={{ background: "#1D6AF8" }}
                      >
                        <h3
                          style={{
                            fontFamily: "Merriweather",
                            fontSize: "20px",
                          }}
                        >
                          {data?.name}
                        </h3>
                      </div>
                      <div className="ps-3 py-4">
                        <div className="d-flex">
                          <h3 className={Style.title}>Occupation:</h3>
                          <span className={Style.titleSpan}>
                            {data?.occupation}
                          </span>
                        </div>
                        <div className="d-flex">
                          <h3 className={Style.title}>Country:</h3>
                          <span className={Style.titleSpan}>
                            {data?.country}
                          </span>
                        </div>
                        <div className="d-flex">
                          <h3 className={Style.title}>City:</h3>
                          <span className={Style.titleSpan}>{data?.city}</span>
                        </div>
                        <div className="d-flex">
                          <h3 className={Style.title}>Blood:</h3>
                          <span className={Style.titleSpan}>{data?.blood}</span>
                        </div>
                        <div className="d-flex">
                          <h3 className={Style.title}>Phone:</h3>
                          <span className={Style.titleSpan}>{data?.phone}</span>
                        </div>
                        <div className="d-flex">
                          <h3 className={Style.title}>Email:</h3>
                          <span className={Style.titleSpan}>{data?.email}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={8} sm={12}>
                    <div>
                      <h3 className={Style.title}>Academic Training</h3>
                      {data?.training ? (
                        <p>{data?.training}</p>
                      ) : (
                        <p>No informaiton found</p>
                      )}
                    </div>
                    <div>
                      <h3 className={Style.title}>Specific Areas of Expertise</h3>
                      {data?.expertise ? (
                        <p>{data?.expertise}</p>
                      ) : (
                        <p>No informaiton found</p>
                      )}
                    </div>
                    <div>
                      <h3 className={Style.title}>Affiliation</h3>
                      {data?.affiliation ? (
                        <p>{data?.affiliation}</p>
                      ) : (
                        <p>No informaiton found</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        )}
      </main>
    </>
  );
};

export default ProfileDetails;
