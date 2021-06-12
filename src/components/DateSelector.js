import moment from "moment";
import { Tag } from "antd";
import { Fragment, useContext, useState } from "react";
import { DateContext } from "../services/DateService";

export const DateSelector = () => {
  const { dates, toggleDates } = useContext(DateContext);
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4]);

  const addNumber = () => {
    setNumbers(number => [...number, number.length])
  }

  return (
    <Fragment>
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
              margin: '0.2rem'
            }}
          >
            {requiredFormat} &nbsp; ( {data.format("dddd")} )
          </Tag>
        );
      })}
      <Tag color="geekblue" onClick={addNumber}>+</Tag>
    </Fragment>
  );
};
