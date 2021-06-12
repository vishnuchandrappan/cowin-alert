// eslint-disable-next-line import/no-unresolved
import moment from "moment";
import { Divider, Tag, Tooltip } from "antd";
import { useContext, useState } from "react";
import { DateContext } from "../services/DateService";

export const DateSelector = () => {
  const { dates, toggleDates } = useContext(DateContext);
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4]);

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
