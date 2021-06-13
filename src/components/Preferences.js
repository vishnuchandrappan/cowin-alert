import { Row, Col, InputNumber, Tooltip, Select, Divider } from "antd";
import { useContext } from "react";
import { FREE, PAID } from "../helpers/constants";
import { PreferencesContext } from "../services/PreferencesService";
import { SettingsContext } from "../services/SettingsService";

const { Option } = Select;

export const Preferences = () => {
  const {
    refreshTime,
    setRefreshTime,
    cost,
    setCost,
    minAgeLimit,
    setMinAgeLimit,
    dose,
    setDose,
    vaccine,
    setVaccine,
  } = useContext(PreferencesContext);

  const { disablePreferences } = useContext(SettingsContext);

  return (
    <Row className={`preferences ${disablePreferences ? "disabled" : null}`}>
      <Col span={24}>
        <h1>Select preferences</h1>
      </Col>
      <Col span={8}>
        <Tooltip title={`Only dose - ${dose} results will be displayed`}>
          <span>Select Dose</span>
        </Tooltip>
      </Col>
      <Col span={16}>
        <Select
          style={{
            width: "100%",
            margin: "0 0.2rem",
          }}
          value={dose}
          placeholder="Select Dose"
          onChange={setDose}
        >
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
        </Select>
      </Col>
      <Col span={8}>
        <Tooltip
          title={`Automatic refresh will be happening every ${refreshTime} sec`}
        >
          <span>Refresh time</span>
        </Tooltip>
      </Col>
      <Col span={16}>
        <InputNumber
          min={4}
          style={{
            width: "100%",
            margin: "0 0.2rem",
          }}
          placeholder="Refresh time"
          value={refreshTime}
          onChange={setRefreshTime}
        />
      </Col>
      <Col span={8}>
        <Tooltip title={`Change cost preference of vaccine as ${cost}`}>
          <span>Free or paid</span>
        </Tooltip>
      </Col>
      <Col span={16}>
        <Select
          style={{
            width: "100%",
            margin: "0 0.2rem",
          }}
          value={cost}
          placeholder="Cost of vaccine"
          onChange={setCost}
        >
          <Option value={FREE}>Free</Option>
          <Option value={PAID}>Paid</Option>
        </Select>
      </Col>
      <Col span={8}>
        <Tooltip
          title={`If set to 'Yes', the search results will be filtered with age limit of 45`}
        >
          <span>Limit age ?</span>
        </Tooltip>
      </Col>
      <Col span={16}>
        <Select
          style={{
            width: "100%",
            margin: "0 0.2rem",
          }}
          value={minAgeLimit}
          placeholder="Filter search results based on minimum age"
          onChange={setMinAgeLimit}
        >
          <Option value={45}>Above 45</Option>
          <Option value={40}>40 - 44</Option>
          <Option value={18}>18 to 39</Option>
        </Select>
      </Col>
      <Col span={8}>
        <Tooltip
          title={`Search results will only contain slots having ${vaccine} vaccine`}
        >
          <span>Vaccine</span>
        </Tooltip>
      </Col>
      <Col span={16}>
        <Select
          style={{
            width: "100%",
            margin: "0 0.2rem",
          }}
          value={vaccine}
          placeholder="Preferred vaccine"
          onChange={setVaccine}
        >
          <Option value="ANY">Any</Option>
          <Option value="COVISHIELD">Covishield</Option>
          <Option value="COVAXIN">Covaxin</Option>
          <Option value="SPUTNIK V">Sputnik V</Option>
        </Select>
      </Col>
      <Col />
      <Divider />
    </Row>
  );
};
