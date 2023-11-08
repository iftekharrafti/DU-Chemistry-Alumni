import Head from "next/head";
import CarouselBanner from "@/components/home/carouselBanner/CarouselBanner";
import HomeCountUp from "@/components/home/homeCountUp/HomeCountUp";
import PresidentSecretery from "@/components/home/presidentSecretery/PresidentSecretery";
import useFetch from "@/hooks/useFetch";
import SliderSkeleton from "@/components/loader/SliderSkeleton";
import FeaturesSkeleton from "@/components/loader/FeaturesSkeleton";

export default function Home() {
  const { data, loading } = useFetch("/home");
  return (
    <>
      <Head>
        <title> Dhaka University Chemistry Alumni Association</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        <>
          {loading ? (
            <SliderSkeleton />
          ) : (
            <CarouselBanner data={data} loading={loading} />
          )}

          <HomeCountUp data={data} loading={loading} />
          {loading ? (
            <FeaturesSkeleton />
          ) : (
            <PresidentSecretery data={data} loading={loading} />
          )}
        </>
      </main>
    </>
  );
}
