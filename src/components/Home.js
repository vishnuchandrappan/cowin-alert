import React, { useState } from "react";
import { SelectDistrict } from "./SelectDistrict";
import { PerformSearch } from "./PerformSearch";
import { Preferences } from "./Preferences";
import moment from "moment";
import { Log } from "./Log";
import { SelectState } from "./SelectState";
import { Row, Col, Button } from "antd";

export const FREE = "free";
export const PAID = "paid";

export const Home = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  /** Logging */
  const [log, setLog] = useState([]);

  /** Preferences */
  const [threshold, setThreshold] = useState(3);
  const [refreshTime, setRefreshTime] = useState(5);
  const [cost, setCost] = useState(FREE);
  const [minAgeLimit, setMinAgeLimit] = useState(false);

  /** Modal */
  const [showPreferences, setShowPreferences] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const today = moment().format("DD-MM-YYYY");

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
  };

  const hidePreferences = () => {
    setShowPreferences(false);
  };

  const hideLog = () => {
    setShowLog(false);
  };

  const preferencesProps = {
    cost,
    setCost,
    minAgeLimit,
    setMinAgeLimit,
    threshold,
    setThreshold,
    refreshTime,
    setRefreshTime,
    setLog,
    showPreferences,
    hidePreferences,
  };

  const searchProps = {
    district_id: selectedDistrict,
    date: today,
    refreshTime,
    threshold,
  };

  const logProps = {
    log,
    showLog,
    hideLog,
  };

  const selectDistrictProps = {
    state_id: selectedState,
    setSelectedDistrict,
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowPreferences(true);
        }}
      >
        Settings
      </Button>
      <Button
        onClick={() => {
          setShowLog(true);
        }}
      >
        Logs
      </Button>
      <Row>
        <Col span={12}>
          <SelectState handleChange={handleStateChange} />
          {selectedState && <SelectDistrict {...selectDistrictProps} />}
        </Col>

        <Col span={12}>
          <PerformSearch {...searchProps} />
        </Col>
      </Row>

      <Log {...logProps} />
      <Preferences {...preferencesProps} />
    </div>
  );
};
