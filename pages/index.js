import Page from "../components/Layouts/Page";
import CallToAction from "../sections/CallToAction/CallToAction";
import Footer from "../sections/Footer/Footer";
import Hero from "../sections/Hero/Hero";
import HowItWorks from "../sections/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <Page>
      <Hero />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </Page>
  );
}
