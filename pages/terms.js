import Page from "../components/Layouts/Page";
import Footer from "../sections/Footer/Footer";

export default function Home() {
  return (
    <Page>
      <h1 className="text-2xl sm:text-3xl sm:pt-10 font-bold text-red-500 text-center">
        Terms and Conditions
      </h1>

      <div className="prose mx-auto prose-invert mt-10 px-4 sm:pb-10">
        <h4>Upon singing up you must know the things below</h4>
        <ul>
          <li>
            Your phone number will be public. Your might get a call at any
            moment.
          </li>
          <li>
            If someone takes your number and misuse it, we are not responsible
            for that, Since numbers are public
          </li>

          <li>
            If you don&apos;t want to donate blood or hide yourself from the
            search result. You can set your availability from your edit profile
            page
          </li>
        </ul>

        <h4>How we use your data? Do we sell it?</h4>
        <p>
          Once you signup your data is available to the public. Whenever someone
          searches for blood, If their criteria matches your profile you will
          show up on the search bar. We do not sell data to any third party.
        </p>
      </div>
    </Page>
  );
}
