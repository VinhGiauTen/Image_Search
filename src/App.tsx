import React, { useEffect, useState } from "react";
type Picture = {
  id: string;
  webformatURL: string;
  user: string;
  views: number;
  downloads: number;
  likes: number;
  tags: string;
};

export default function App() {
  const [pic, setPic] = useState<Picture[]>([]);
  const [err, setErr] = useState("");
  const [value, setValue] = useState("");

  async function getPic(value: string) {
    const response = await fetch(
      "https://pixabay.com/api/?key=19372100-aa84a989411d7181796e975ac&q=" +
        value +
        "&image_type=photo&pretty=true"
    );
    const pic = await response.json();
    console.log(response);
    console.log(pic);
    return pic.hits;
  }

  async function Loading() {
    try {
      const picture = await getPic(value);
      setPic(picture);
    } catch (error) {
      setErr((error as Error).message);
    }
  }

  useEffect(() => {
    Loading();
  }, []);

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      Loading();
    }
  }
  return (
    <div>
      <div className="border-b-2 border-[#6EE7B7] w-1/6 mx-auto m-5 p-2 flex">
        <input
          placeholder="Search Image"
          className="p-2 outline-none"
          value={value}
          onChange={handleChangeValue}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={Loading}
          disabled={!value}
          className="bg-[#6EE7B7] border border-[#10b981] p-2 rounded-lg hover:bg-green-700 hover:text-white"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 mx-auto xl:w-2/3 gap-10 justify-items-center">
        {pic.map((p) => (
          <div key={p.id} className="rounded-xl shadow-2xl w-fit">
            <img
              src={p.webformatURL}
              className="rounded-xl object-cover h-60 w-full"
            />
            <div className="p-5 space-y-2">
              <p className="text-[#8B5CF6] font-bold text-xl">
                Photo by {p.user}
              </p>
              <ul className="font-bold capitalize">
                <li>
                  views: <span className="font-normal">{p.views}</span>
                </li>
                <li>
                  downloads: <span className="font-normal">{p.downloads}</span>
                </li>
                <li>
                  likes: <span className="font-normal">{p.likes}</span>
                </li>
              </ul>
              <ul className="space-y-2 *:inline-block *:bg-gray-200 *:rounded-full  *:px-3 *:py-1 *:text-sm *:font-semibold *:text-gray-700 *:mr-2">
                {p.tags.split(", ").map((t, i) => (
                  <li key={t + i}># {t}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <p>{err}</p>
    </div>
  );
}
