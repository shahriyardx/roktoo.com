import Page from "../components/Page";
import CallToAction from "../sections/CallToAction/CallToAction";
import Hero from "../sections/Hero/Hero";
import HowItWorks from "../sections/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <Page>
      <Hero />
      <HowItWorks />
      <CallToAction />
    </Page>
  );
}
