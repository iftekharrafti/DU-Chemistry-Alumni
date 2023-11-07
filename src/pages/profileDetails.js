/* eslint-disable @next/next/no-img-element */
import { baseImgUrl } from "@/utils/imgUrl";
import { useRouter } from "next/router";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Style from "@/styles/profileDetails.module.css";
import Head from "next/head";

const ProfileDetails = () => {
  const router = useRouter();
  const { item } = router.query;

  if (!item) {
    return <div>Loading...</div>;
  }

  const parsedItem = JSON.parse(item);
  console.log(parsedItem);
  return (
    <>
        <Head>
        <title>{parsedItem?.name}</title>
        <meta name="description" content="Profile Details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
      <div style={{ background: "#EDF0F2", padding: "1px 0 30px 0" }}>
      <Container>
        <div
          style={{ background: "#fff", padding: "25px 25px", margin: "40px 0" }}
        >
          <Row>
            <Col md={4} sm={12}>
              <img
                src={baseImgUrl + parsedItem?.profile_image}
                className={Style.profileImg}
                alt="instructor"
                // className="img-fluid"
                style={{ width: "100%" }}
              />
              <div style={{ background: "#EDF0F2", marginBottom: "30px" }}>
                <div
                  className="w-100 text-center text-white py-1"
                  style={{ background: "#1D6AF8" }}
                >
                  <h3 style={{ fontFamily: "Merriweather" , fontSize: '20px'}}>
                    {parsedItem?.name}
                  </h3>
                </div>
                <div className="ps-3 py-4">
                  <div className="d-flex">
                    <h3 className={Style.title}>Occupation:</h3>
                    <span className={Style.titleSpan}>
                      {parsedItem?.occupation}
                    </span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Country:</h3>
                    <span className={Style.titleSpan}>
                      {parsedItem?.country}
                    </span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>City:</h3>
                    <span className={Style.titleSpan}>{parsedItem?.city}</span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Blood:</h3>
                    <span className={Style.titleSpan}>{parsedItem?.blood}</span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Phone:</h3>
                    <span className={Style.titleSpan}>{parsedItem?.phone}</span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Email:</h3>
                    <span className={Style.titleSpan}>{parsedItem?.email}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={8} sm={12}>
              <div>
                <h3 className={Style.title}>Academic Training</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  quisquam pariatur inventore minus tempore id saepe aspernatur,
                  officia sunt animi, nisi eum non quod culpa, error a esse
                  harum accusantium.
                </p>
              </div>
              <div>
                <h3 className={Style.title}>Expertise</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  quisquam pariatur inventore minus tempore id saepe aspernatur,
                  officia sunt animi, nisi eum non quod culpa, error a esse
                  harum accusantium.
                </p>
              </div>
              <div>
                <h3 className={Style.title}>Affiliation</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  quisquam pariatur inventore minus tempore id saepe aspernatur,
                  officia sunt animi, nisi eum non quod culpa, error a esse
                  harum accusantium.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
      </main>
    </>
    
  );
};

export default ProfileDetails;

{
  /* <Col md={9} className="mx-auto mt-3">
            <Row className="d-flex align-items-center">
              <Col md={4}>
                <img
                  src={baseImgUrl + parsedItem?.profile_image}
                  className={Style.profileImg}
                  alt=""
                />
              </Col>
              <Col md={8}>
                <div className="d-flex">
                  <h3 className={Style.title}>Name: </h3>
                  <span className={Style.titleSpan}>{parsedItem?.name}</span>
                </div>
                <div className="d-flex">
                  <h3 className={Style.title}>Occupation:</h3>
                  <span className={Style.titleSpan}>
                    {parsedItem?.occupation}
                  </span>
                </div>
                <div className="d-flex">
                  <h3 className={Style.title}>Country:</h3>
                  <span className={Style.titleSpan}>{parsedItem?.country}</span>
                </div>
                <div className="d-flex">
                  <h3 className={Style.title}>City:</h3>
                  <span className={Style.titleSpan}>{parsedItem?.city}</span>
                </div>
                <div className="d-flex">
                  <h3 className={Style.title}>Blood:</h3>
                  <span className={Style.titleSpan}>{parsedItem?.blood}</span>
                </div>
                <div className="d-flex">
                  <h3 className={Style.title}>Phone:</h3>
                  <span className={Style.titleSpan}>{parsedItem?.phone}</span>
                </div>
                <div className="d-flex">
                  <h3 className={Style.title}>Email:</h3>
                  <span className={Style.titleSpan}>{parsedItem?.email}</span>
                </div>
              </Col>
            </Row>
            <Card style={{ width: "100%" }} className="mt-3">
              <Card.Body>
                <Card.Title className={Style.cardTitle}>Academic Training</Card.Title>
                <Card.Text className={Style.cardText}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde quam, laborum consectetur maxime accusamus laudantium dolores debitis molestias harum quae!
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "100%" }} className="mt-3">
              <Card.Body>
                <Card.Title className={Style.cardTitle}>Expertise</Card.Title>
                <Card.Text className={Style.cardText}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde quam, laborum consectetur maxime accusamus laudantium dolores debitis molestias harum quae!
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "100%" }} className="mt-3 mb-3">
              <Card.Body>
                <Card.Title className={Style.cardTitle}>Affiliation</Card.Title>
                <Card.Text className={Style.cardText}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde quam, laborum consectetur maxime accusamus laudantium dolores debitis molestias harum quae!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col> */
}
