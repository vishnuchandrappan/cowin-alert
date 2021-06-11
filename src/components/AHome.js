import React, { useState } from "react";
import { SelectDistrict } from "./SelectDistrict";
import { PerformSearch } from "./PerformSearch";
import { Preferences } from "./Preferences2";
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
  const [threshold, setThreshold] = useState(1);
  const [refreshTime, setRefreshTime] = useState(5);
  const [cost, setCost] = useState(FREE);
  const [minAgeLimit, setMinAgeLimit] = useState(false);

  /** Modal */
  const [showPreferences, setShowPreferences] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const today = moment().format("DD-MM-YYYY");
  const tommorow = moment().add(1,'days').format("DD-MM-YYYY");
  const dayAfter = moment().add(2,'days').format("DD-MM-YYYY");

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

  const audio = new Audio('https://freesound.org/data/previews/72/72125_1028972-lq.mp3');
  const audio2 = new Audio('https://freesound.org/data/previews/426/426888_7913959-lq.mp3');

  const searchProps = {
    district_id: selectedDistrict,
    date: today,
    refreshTime,
    threshold,
    audio,
    audio2
  };

  const search2Props = {
    ...searchProps,
    date: tommorow
  }

  const search3Props = {
    ...searchProps,
    date: dayAfter
  }

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
          <PerformSearch {...search2Props} />
          <PerformSearch {...search3Props} />
        </Col>
      </Row>

      <Log {...logProps} />
      <Preferences {...preferencesProps} />
    </div>
  );
};
