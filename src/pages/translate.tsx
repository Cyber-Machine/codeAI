import { useState } from "react";
import Spinner from "./components/Spinner";

export default function Translate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    console.log(dataObj);

    setLoading(true);

    const response = await fetch("/api/code/translate", {
      method: "POST",
      body: JSON.stringify({
        prompt: dataObj.prompt,
        lang1: dataObj.lang1,
        lang2: dataObj.lang2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    let formatted = result.replace(/(\r\n|\n|\\n|\r)/gm, ` \n `);
    let formatted2: any = formatted.replace(/ +(?= )/g, "");
    let formatted3: any = formatted2.replace(/;/g, `; \n `);

    setData(formatted3);
    setLoading(false);
  };
  return (
    <>
      <div className="text-center">
        <div className="my-5 text-3xl"> Language converter🔄</div>
        <form onSubmit={handleSubmit}>
          <select name="lang1" id="" className="text-xl resize rounded-md mx-5 py-5 px-5 text-third">
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
          <select name="lang2" id="" className="text-xl resize rounded-md mx-5 py-5 px-5 text-third">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <input
            type="text"
            className="text-xl resize rounded-md mt-5 px-20 py-5  "
            name="prompt"
            placeholder="Enter your query"
          />{" "}
          <br />
          <button
            type="submit"
            className="bg-third text-xl text-secondary mt-10 rounded px-10 py-2 my-4 hover:bg-secondary hover:text-third border-2 border-third"
          >
            Submit
          </button>
        </form>

        {loading ? <Spinner /> : null}
        <textarea className="resize rounded-md w-[40rem] h-[20rem] text-center py-5 mt-10" value={data}></textarea>
      </div>
    </>
  );
}
