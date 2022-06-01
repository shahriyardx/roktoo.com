import React, { useState, useEffect } from "react";
import Container from "../components/Layouts/Container";
import Page from "../components/Layouts/Page";
import cities from "../data/cities";
import { BiLoaderAlt } from "react-icons/bi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SEO from "../components/SEO";
import { useSelector } from "react-redux";

const Search = () => {
  const { data: session } = useSession();
  const donators = useSelector((state) => state.donator);

  const [blood, setBlood] = useState();
  const [district, setDistrict] = useState();
  const [area, setArea] = useState();
  const [areas, setAreas] = useState([]);
  const [results, setResults] = useState({ data: [], loaded: false });
  const [error, setError] = useState(
    "Please select blood and district to find blood"
  );

  useEffect(() => {
    if (!blood && !district) return;
    if (!blood) {
      return setError("Please select a blood type.");
    }

    if (!district) {
      return setError("Please select a district.");
    }

    setAreas(cities[district]);
    let searchResult = donators.filter(
      (donator) => donator.blood == blood && donator.district == district
    );
    if (area) {
      searchResult = searchResult.filter((result) => result.area == area);
    }
    if (searchResult.length < 1) {
      setResults({ data: [], loaded: true });
      return setError(`No ${blood} blood donor registered in this area`);
    }

    setResults({ data: searchResult, loaded: true });
    setError("");
  }, [blood, district, area, donators]);

  return (
    <Page>
      <SEO title="Search" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-seachPage gap-10 pt-5 sm:pb-10">
          <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-2">
              <div className="flex flex-col">
                <select
                  name="blood"
                  id="blood"
                  onChange={(e) => setBlood(e.target.value)}
                >
                  <option value="">- Blood group -</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="flex flex-col">
                <select
                  name="district"
                  id="district"
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option defaultValue="">- Select District -</option>
                  {Object.keys(cities)
                    .sort()
                    .map((city) => {
                      return (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      );
                    })}
                </select>
              </div>
              <select
                name="area"
                id="area"
                onChange={(e) => setArea(e.target.value)}
              >
                <option defaultValue="">- Select Area -</option>
                {areas.map((area) => {
                  return (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  );
                })}
              </select>
            </div>

            {!session && (
              <div className="p-4 bg-red-500 mt-5 rounded-md flex-col gap-5 hidden md:flex">
                <h1 className="text-xl text-white font-bold text-center">
                  You need someone for blood, maybe someone need you too
                </h1>

                <Link href="/register" passHref>
                  <a className="px-5 py-3 bg-white rounded-md text-center font-semibold">
                    Become Donor
                  </a>
                </Link>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            {error && <p className="text-xl font-bold text-red-500">{error}</p>}
            <div>
              {results.data.length > 0 && (
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-black text-white">SL.</th>
                      <th className="px-5 py-3 bg-black text-white">Donor</th>
                      <th className="px-5 py-3 bg-black text-white">Address</th>
                      <th className="px-5 py-3 bg-black text-white">Phone</th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.data.map((donator, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-5 py-3 whitespace-nowrap dark:text-zinc-200">
                            1
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap dark:text-zinc-200">
                            {donator.name}
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap dark:text-zinc-200">
                            {donator.address}
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap dark:text-zinc-200">
                            <a
                              href={`tel:+88${donator.phone}`}
                              className="font-bold text-blue-500 text-lg"
                            >
                              {donator.phone}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default Search;
