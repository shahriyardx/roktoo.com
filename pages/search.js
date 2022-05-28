import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import Page from "../components/Page";
import cities from "../data/cities";
import { BiLoaderAlt } from "react-icons/bi";

const Search = () => {
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searched, setSearched] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSearch = async (data) => {
    district ? setDisError("") : setDisError("Please choose district");

    if (!district) return;
    setSearched(true);
    const query = new URLSearchParams();
    query.append("blood", data.blood);
    query.append("district", district);

    if (area) {
      query.append("area", area);
    }
    setSearching(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/search?${query}`
    ).then((data) => data.json());
    setSearchResult(response);
    setSearching(false);
  };

  const [district, setDistrict] = useState();
  const [area, setArea] = useState();
  const [areas, setAreas] = useState([]);
  const [disError, setDisError] = useState("");

  useEffect(() => {
    if (!district) {
      setArea("");
      setAreas([]);
    }
    if (district) {
      setAreas(cities[district] || []);
      setDisError("");
    }
  }, [district]);

  return (
    <Page>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-seachPage gap-10 mt-5">
          <div>
            <form onSubmit={handleSubmit(handleSearch)}>
              <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-2">
                <div className="flex flex-col">
                  <select
                    name="blood"
                    id="blood"
                    {...register("blood", {
                      required: {
                        value: true,
                        message: "Please select blood group",
                      },
                    })}
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
                  <p className=" mt-1 text-sm text-red-500">
                    {errors.blood?.message}
                  </p>
                </div>

                <div className="flex flex-col">
                  <select
                    name="district"
                    id="district"
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">- Select District -</option>
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
                  <p className=" mt-1 text-sm text-red-500">{disError}</p>
                </div>
                <select
                  name="area"
                  id="area"
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="">- Select Area -</option>
                  {areas.map((area) => {
                    return (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    );
                  })}
                </select>
                <button className="py-3 bg-red-500 font-semibold text-white flex justify-center items-center gap-2">
                  {searching && (
                    <BiLoaderAlt className="text-2xl animate-spin" />
                  )}
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          <div className="overflow-x-auto">
            {!searching && (
              <>
                <p className="text-lg">
                  {!searched &&
                    !searchResult.length &&
                    "Please select blood group and district to search"}
                </p>

                <p className="text-lg">
                  {searched && !searchResult.length && "No blood donor found."}
                </p>
              </>
            )}

            <div>
              {searchResult.length > 0 && (
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
                    {searchResult.map((donator, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-5 py-3 whitespace-nowrap">1</td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            {donator.name}
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            {donator.address}
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap">
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
