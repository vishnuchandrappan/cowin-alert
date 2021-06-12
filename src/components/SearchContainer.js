import { Col, Divider, Row } from "antd";
import { useContext } from "react";
import { PerformSearch } from "./PerformSearch";
import { AppContext } from "../services/AppService";
import { DateContext } from "../services/DateService";
import { PreferencesContext } from "../services/PreferencesService";


export const SearchContainer = () => {
  const { selectedDistrict, alert } = useContext(AppContext);
  const { refreshTime, cost, minAgeLimit, dose } = useContext(PreferencesContext);
  const { dates } = useContext(DateContext);

  const searchProps = {
    district_id: selectedDistrict,
    threshold: 1,
    audio: alert,
    cost,
    refreshTime,
    minAgeLimit,
    dose
  };

  if (!selectedDistrict || dates.length === 0) {
    return null;
  }

  return (
    <Row className="results">
      <Col span={24}>
        <h1>Search Results</h1>
      </Col>
      <Divider />
      <Col span={24}>
        {dates.map(date => (
          <PerformSearch key={date} {...searchProps} date={date} />
        ))}
      </Col>
    </Row>
  )
}
