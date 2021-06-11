import moment from "moment";
import { Tag } from "antd";
import { Fragment, useContext } from "react";
import { DateContext } from "./services/DateService";

export const DateSelector = () => {
  const { dates, toggleDates } = useContext(DateContext);

  return (
    <Fragment>
      <h1>Select dates</h1>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
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
    </Fragment>
  );
};
