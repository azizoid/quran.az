import React, { useState, useEffect, useCallback } from "react"
import moment from "moment-hijri"
import { hijriMonthList } from "../../assets/hijriMonthList"

const prayersListEmpty = [
  { id: 1, title: "Fəcr", time: "--:--" },
  { id: 2, title: "Günəş", time: "--:--" },
  { id: 3, title: "Zöhr", time: "--:--" },
  { id: 4, title: "Əsr", time: "--:--" },
  { id: 5, title: "Məğrib", time: "--:--" },
  { id: 6, title: "İşa", time: "--:--" },
]

const PrayerWidget = (): JSX.Element => {
  const [prayers, setPrayers] = useState(prayersListEmpty)
  const tarix = moment()
  const dayOfYear = tarix.dayOfYear()

  const fetchData = useCallback(async () => {
    await fetch(`https://nam.az/api/1/${dayOfYear}`)
      .then((response) => response.json())
      .then((data) => {
        const out = prayersListEmpty.map((prayer, i) => {
          prayer["time"] = data["prayers"][i]
          return prayer
        })
        setPrayers(out)
      })
  }, [dayOfYear])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <table className="w-full table-auto text-sm" cellPadding={7}>
      <thead className="bg-gray-700 text-white">
        <tr>
          <td align="center" colSpan={3}>
            {hijriMonthList[Number(tarix.format("iD")) + 1]} ayı /{" "}
            {tarix.format("iD / iYYYY")}
          </td>
          <td align="center">
            <a href="https://nam.az" target="_blank" rel="noreferrer">
              Bakı
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
  )
}
export default PrayerWidget
