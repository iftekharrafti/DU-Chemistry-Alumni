import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import CarouselBanner from "@/components/home/carouselBanner/CarouselBanner";
import HomeCountUp from "@/components/home/homeCountUp/HomeCountUp";
import PresidentSecretery from "@/components/home/presidentSecretery/PresidentSecretery";
import HomeAdvisor from "@/components/home/homeAdvisor/HomeAdvisor";
import useFetch from "@/hooks/useFetch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, loading } = useFetch("/home");
  return (
    <>
      <Head>
        <title>HOME::{data?.admin?.nameen}</title>
        <meta name="description" content={data?.admin?.nameen} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
        <CarouselBanner data={data} loading={loading} />
        <HomeCountUp data={data} loading={loading} />
        <PresidentSecretery data={data} loading={loading} />
      </main>
    </>
  );
}
