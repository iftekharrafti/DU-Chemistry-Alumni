/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import Style from "@/styles/gallery.module.css";

import { baseImgUrl } from "@/utils/imgUrl";
import Img from "@/components/lazyLoadImage/Img";

const inter = Inter({ subsets: ["latin"] });

export default function Gallery() {
  const { data, loading } = useFetch("/magazine/Gallery");


  return (
    <>
      <Head>
        <title>GALLERY::{data?.admin?.nameen}</title>
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
            {/* Gallery Title */}
            <div className="headerTitle">
              <h3 class="headerTitleMain">Gallery</h3>
            </div>
            {/* Gallery Details */}
            <Container className="mt-2 mb-3">
              <div className={Style.gallery}>
                {data?.data?.map((item, index) => {
                  return (
                    <div className={Style.pics} key={index}>
                      <Img
                        src={baseImgUrl + item?.image}
                        alt=""
                        style={{ width: "100%" }}
                        className={`${Style.img} img-fluid`}
                      />
                    </div>
                  );
                })}
              </div>
            </Container>
          </>
        )}
      </main>
    </>
  );
}
