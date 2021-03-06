import React, { useState, useRef, useEffect } from "react";
import getDayOfYear from "date-fns/getDayOfYear";

const prayersListEmpty = [
  { id: 1, title: "Fəcr", time: "--:--" },
  { id: 2, title: "Günəş", time: "--:--" },
  { id: 3, title: "Zöhr", time: "--:--" },
  { id: 4, title: "Əsr", time: "--:--" },
  { id: 5, title: "Məğrib", time: "--:--" },
  { id: 6, title: "İşa", time: "--:--" },
];

const PrayerWidget = () => {
  const [prayers, setPrayers] = useState(prayersListEmpty);
  const [hijri, setHijri] = useState("");
  const dd = useRef(getDayOfYear(new Date()));

  useEffect(() => {
    async function fetchData() {
      await fetch("https://nam.az/api/1/" + dd.current)
        .then((response) => response.json())
        .then((data) => {
          const out = prayersListEmpty.map((prayer, i) => {
            prayer["time"] = data["prayers"][i];
            return prayer;
          });
          setHijri(data.hijri);
          setPrayers(out);
        });
    }
    fetchData();
  }, []);

  return (
    <table className="table table-borderless table-sm">
      <thead className="table-dark">
        <tr>
          <td align="center" colSpan={2}>
            {hijri}
          </td>
          <td align="center">Bakı</td>
          <td align="center">
            <a
              href="https://nam.az"
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-danger"
              style={{ padding: "0.4em", fontSize: "1.rem" }}
            >
              Digər şəhərlər
            </a>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="right">{prayers[0]["title"]}</td>
          <td>{prayers[0]["time"]}</td>
          <td align="right">{prayers[1]["title"]}</td>
          <td>{prayers[1]["time"]}</td>
        </tr>
        <tr>
          <td align="right">{prayers[2]["title"]}</td>
          <td>{prayers[2]["time"]}</td>
          <td align="right">{prayers[3]["title"]}</td>
          <td>{prayers[3]["time"]}</td>
        </tr>
        <tr>
          <td align="right">{prayers[4]["title"]}</td>
          <td>{prayers[4]["time"]}</td>
          <td align="right">{prayers[5]["title"]}</td>
          <td>{prayers[5]["time"]}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default PrayerWidget;
