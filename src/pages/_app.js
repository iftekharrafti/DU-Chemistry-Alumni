import Footer from "@/components/footer/Footer";
import HeaderMenu from "@/components/header/headerMenu/HeaderMenu";
import HeaderTop from "@/components/header/headerTop/HeaderTop";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="topApp">
        <HeaderTop />
      </div>
      <HeaderMenu />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
