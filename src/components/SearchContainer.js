import { Col, Divider, Row, Collapse, Alert } from "antd";
import { useContext } from "react";
import { PerformSearch } from "./PerformSearch";
import { AppContext } from "../services/AppService";
import { DateContext } from "../services/DateService";
import { PreferencesContext } from "../services/PreferencesService";

const { Panel } = Collapse;

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
    return (
      <>
        {!selectedDistrict && (<Alert
          message="Select state & district first"
          type="info"
          showIcon
        />)}
        {dates.length === 0 && (<Alert
          message="Click on dates to select one. Select as many dates as you like"
          type="info"
          showIcon
        />)}
      </>
    );
  }

  return (
    <Row className="results">
      <Col span={24}>
        <h1>Search Results</h1>
      </Col>
      <Divider />
      <Col span={24}>
        <Collapse activeKey={dates}>
          {dates.map(date => (
            <Panel header={date} key={date}>
              <PerformSearch {...searchProps} date={date} />
            </Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  )
}
