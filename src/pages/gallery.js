/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Col, Container, Row } from "react-bootstrap";
import Style from "@/styles/gallery.module.css";
import { baseImgUrl } from "@/utils/imgUrl";
import Img from "@/components/lazyLoadImage/Img";
import GalleryViewModal from "@/components/galleryViewModal/GalleryViewModal";
import { useState } from "react";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { TITLE } from "@/utils/api";

export default function Gallery() {
  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState("");
  

  const { data, loading } = useFetch("/magazine/Gallery");

  return (
    <>
      <Head>
        <title>GALLERY::{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Gallery Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Gallery</h3>
            </div>
            {/* Gallery Details */}
            <Container className="mt-2 mb-3">

              <Row>
                {data?.data?.map((image) => (
                  <Col md={3} sm={6} key={image.id} className="mb-3">
                    <div onClick={() => {
                        setModalShow(true);
                        setImage(image?.image);
                      }}>
                    <Img
                      src={baseImgUrl + image?.image}
                      alt=""
                      style={{ width: "100%" }}
                      className={`${Style.img} img-fluid`}
                    />
                    </div>
                  </Col>
                ))}
              </Row>

              {/* Gallery big picture */}
              <GalleryViewModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                image={image}
              />
            </Container>
          </>
        )}
      </main>
    </>
  );
}
