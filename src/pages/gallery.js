/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Inter } from "next/font/google";
import useFetch from "@/hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import Style from "@/styles/gallery.module.css";

import Img1 from "@/gallery/1.jpg";
import Img2 from "@/gallery/2.jpg";
import Img3 from "@/gallery/3.jpg";
import Img4 from "@/gallery/4.jpg";
import Img5 from "@/gallery/5.jpg";
import Img6 from "@/gallery/6.jpg";
import Img7 from "@/gallery/7.jpg";
import { baseImgUrl } from "@/utils/imgUrl";
import Img from "@/components/lazyLoadImage/Img";

const inter = Inter({ subsets: ["latin"] });

export default function Gallery() {
  const { data, loading } = useFetch("/magazine/Gallery");

  let galleryData = [
    {
      id: 1,
      imgSrc: Img1,
    },
    {
      id: 2,
      imgSrc: Img2,
    },
    {
      id: 3,
      imgSrc: Img3,
    },
    {
      id: 4,
      imgSrc: Img4,
    },
    {
      id: 5,
      imgSrc: Img5,
    },
    {
      id: 6,
      imgSrc: Img6,
    },
    {
      id: 7,
      imgSrc: Img7,
    },
  ];

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
