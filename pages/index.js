import Head from "next/head";
import Header from "../components/Header";
import { NextSeo } from "next-seo";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

export default function Home() {
  return (
    <div className="text-black">
      <NextSeo title="Home: BIRJGI" description="Welcome to BIRJGI homepage." />
      <Head>
        <title>BIRJGI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="text-gray-600 body-font ">
        <div className="max-w-7xl mx-auto  flex px-5 py-36 md:flex-row flex-col items-center justify-center ">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">
            <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900 ">
              Хамгийн амттай пирошки
            </h1>
            <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
              Гайхалтай 5-дах өдрийг Этүгэний пирошкитой хамт өнгөрөөнө гэдэг
              магадгүй танд сайхан мэдрэмж төрүүлж мэдэх юм.
            </p>
            <div className="flex justify-center">
              <a
                className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border bg-slate-700 rounded-lg  hover:bg-slate-800"
                href="/order"
              >
                <span className="justify-center ">Захиалах{" ->"}</span>
              </a>
            </div>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10 flex ">
            <img
              className="w-96 md:ml-1 ml-24 h-auto"
              alt="iPhone-12"
              src="/delivery.svg"
            ></img>
          </div>
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4 text-center justify-center mb-20">
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-5xl text-3xl text-black">
                    <CountUp end={10} redraw={true}>
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </h2>
                  <p className="leading-relaxed">Хэрэглэгч</p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-5xl text-3xl text-black">
                    <CountUp end={345} redraw={true}>
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </h2>
                  <p className="leading-relaxed">Нийт захиалсан пирошки</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="mx-auto">
          <div className="container px-5 mx-auto lg:px-24 "></div>
        </section>
      </section>
    </div>
  );
}
