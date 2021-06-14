/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Row,
  Col,
  InputNumber,
  Tooltip,
  Select,
  Divider,
  Tag,
  Button,
  Input,
  Alert,
} from "antd";
import { useContext, useState } from "react";
import {
  ANY,
  COVAXIN,
  COVISHIELD,
  FREE,
  PAID,
  SPUTNIKV,
} from "../helpers/constants";
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
    centres,
    addToCentres,
    removeFromCentres,
  } = useContext(PreferencesContext);

  const { disablePreferences } = useContext(SettingsContext);
  const [centre, setCentre] = useState("");

  const addCentre = () => {
    addToCentres(centre.toLowerCase());
    setCentre("");
  };

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
          <Option value={ANY}>Any</Option>
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
          <Option value={ANY}>Any</Option>
          <Option value={45}>Above 45</Option>
          <Option value={40}>40</Option>
          <Option value={18}>18</Option>
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
          <Option value={ANY}>Any</Option>
          <Option value={COVISHIELD}>Covishield</Option>
          <Option value={COVAXIN}>Covaxin</Option>
          <Option value={SPUTNIKV}>Sputnik V</Option>
        </Select>
      </Col>
      <Divider />

      <Col span={24}>
        <h3>Filter by specific centres</h3>
      </Col>
      <Col span={24}>
        <Row>
          {centres.map((centre_) => (
            <Col
              key={centre_}
              md={5}
              offset={1}
              style={{ position: "relative" }}
            >
              <span
                className="close-btn"
                onClick={() => {
                  removeFromCentres(centre_);
                }}
              >
                +
              </span>
              <Tag color="blue" className="custom-tag">
                {centre_}
              </Tag>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24} style={{ marginTop: "1rem" }}>
        <Row>
          <Col span={18}>
            <Input
              placeholder="Type something..."
              value={centre}
              onChange={(e) => {
                setCentre(e.target.value);
              }}
            />
          </Col>
          <Col span={4} offset={2}>
            <Button
              disabled={centre.length === 0 || centres.includes(centre)}
              onClick={addCentre}
            >
              Add centre
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={24} style={{ marginTop: "1rem" }}>
        <Alert
          type="info"
          showIcon
          message="Add centre names, pincodes or block panchayat's name"
        />
      </Col>

      <Divider />
    </Row>
  );
};
