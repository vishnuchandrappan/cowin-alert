import { Col, Divider, Row, Collapse, Alert } from "antd";
import { useContext } from "react";
import { PerformSearch } from "./PerformSearch";
import { AppContext } from "../services/AppService";
import { DateContext } from "../services/DateService";
import { PreferencesContext } from "../services/PreferencesService";
import { SettingsContext } from "../services/SettingsService";

const { Panel } = Collapse;

export const SearchContainer = () => {
  const { selectedDistrict, alert } = useContext(AppContext);
  const { dates } = useContext(DateContext);
  const preferences = useContext(PreferencesContext);
  const settings = useContext(SettingsContext);

  const searchProps = {
    districtId: selectedDistrict,
    threshold: 1,
    audio: alert,
    ...preferences,
    ...settings,
  };

  if (!selectedDistrict || dates.length === 0) {
    return (
      <>
        {!selectedDistrict && (
          <Alert message="Select state & district first" type="info" showIcon />
        )}
        {dates.length === 0 && (
          <Alert
            message="Click on dates to select one. Select as many dates as you like"
            type="info"
            showIcon
          />
        )}
      </>
    );
  }

  return (
    <Row className="results" style={{ position: "relative" }}>
      <Col
        span={24}
        style={{
          position: "sticky",
          top: "0",
          zIndex: "999",
          background: "white",
        }}
      >
        <h1>Search Results</h1>
      </Col>
      <Divider />
      <Col span={24}>
        <Collapse activeKey={dates}>
          {dates.map((date) => (
            <Panel header={date} key={date}>
              <PerformSearch {...searchProps} date={date} />
            </Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  );
};
