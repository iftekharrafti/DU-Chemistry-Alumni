import Head from "next/head";
import CarouselBanner from "@/components/home/carouselBanner/CarouselBanner";
import HomeCountUp from "@/components/home/homeCountUp/HomeCountUp";
import PresidentSecretery from "@/components/home/presidentSecretery/PresidentSecretery";
import useFetch from "@/hooks/useFetch";
import SliderSkeleton from "@/components/loader/SliderSkeleton";
import FeaturesSkeleton from "@/components/loader/FeaturesSkeleton";
import HomeNotice from "@/components/home/homeNotice/HomeNotice";
import MemberSkeleton from "@/components/loader/MemberSkeleton";
import { TITLE } from "@/utils/api";
import HomeUpcoming from "@/components/home/homeUpcoming/HomeUpcoming";

export default function Home() {
  const { data, loading } = useFetch("/home");
  const { data: noticeData, loading: noticeLoading } = useFetch("/notice/Notice");
  const { data: upcomingData, loading: upcomingLoading } = useFetch("/notice/Upcoming");

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Dhaka University Chemistry Alumni Association"/>
        <meta property="og:description" content="Dhaka University Chemistry Alumni Association"/>
        <meta property="og:image" content="/favicon.jpeg"/>
        <meta property="og:url" content="https://ducaa.netlify.app/"/>
        <meta name="description" content="Dhaka University Chemistry Alumni Association"  />
        <meta name="keywords" content="Dhaka University,  Chemistry,  Alumni Association" />
        <meta name="author" content="Dhaka University Chemistry Alumni Association" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        <>
          {loading ? (
            <SliderSkeleton />
          ) : (
            <CarouselBanner data={data} loading={loading} />
          )}

          
          {loading ? (
            <FeaturesSkeleton />
          ) : (
            <PresidentSecretery data={data} loading={loading} />
          )}
          <HomeCountUp data={data} loading={loading} />
          {
            noticeLoading ? (
              <MemberSkeleton />
            ) : (
              <HomeNotice noticeData={noticeData?.data} />
            )
          }
          {
            upcomingLoading ? (
              <MemberSkeleton />
            ) : (
              <HomeUpcoming upcomingData={upcomingData} />
            )
          }
        </>
      </main>
    </>
  );
}
