import moment from "moment";
import { Divider, Tag, Tooltip } from "antd";
import { useContext, useState } from "react";
import { DateContext } from "../services/DateService";
import { generateArray } from "../helpers/utils";

export const DateSelector = () => {
  const { dates, toggleDates } = useContext(DateContext);

  let storedDatesCount = 0;
  if (dates.length > 0) {
    const lastDateParts = dates[dates.length - 1].split("-");
    const today = moment();
    const lastDay = moment(
      `${lastDateParts[2]}-${lastDateParts[1]}-${lastDateParts[0]}`
    );
    storedDatesCount = lastDay.diff(today, "day") + 1;
  }

  const [numbers, setNumbers] = useState(
    generateArray(storedDatesCount > 0 ? storedDatesCount : 4)
  );

  const addNumber = () => {
    setNumbers((number) => [...number, number.length]);
  };

  return (
    <>
      <h1>Select dates</h1>
      {numbers.map((item) => {
        const data = moment().add(item, "days");
        const requiredFormat = data.format("DD-MM-YYYY");
        return (
          <Tag
            color={dates.includes(requiredFormat) ? "blue" : "default"}
            key={item}
            onClick={() => {
              toggleDates(requiredFormat);
            }}
            style={{
              margin: "0.2rem",
            }}
          >
            {requiredFormat} &nbsp; ( {data.format("dddd")} )
          </Tag>
        );
      })}
      <Tooltip title="Add next date">
        <Tag color="geekblue" onClick={addNumber}>
          +
        </Tag>
      </Tooltip>
      <Divider />
    </>
  );
};
