import { Row, Col, InputNumber, Tooltip, Select, Divider } from "antd";
import { useContext } from "react";
import { FREE, PAID } from "../helpers/constants";
import { PreferencesContext } from "../services/PreferencesService";
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
    setDose
  } = useContext(PreferencesContext);

  return (
    <div className="preferences">
      <h1>Select preferences</h1>
      <Row>
        <Col span={8}>
          <Tooltip
            title={`Select Dose`}
          >
            <span>Select Dose</span>
          </Tooltip>
        </Col>
        <Col span={16}>
          <Select
            style={{
              width: "100%",
              margin: '0 0.2rem'
            }}
            value={dose}
            placeholder="Select Dose"
            onChange={setDose}
          >
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
        </Col>
      </Row>
      <Row>
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
              margin: '0 0.2rem'
            }}
            placeholder="Refresh time"
            value={refreshTime}
            onChange={setRefreshTime}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Tooltip title={`Change cost preference of vaccine as ${cost}`}>
            <span>Free or paid</span>
          </Tooltip>
        </Col>
        <Col span={16}>
          <Select
            style={{
              width: "100%",
              margin: '0 0.2rem'
            }}
            value={cost}
            placeholder="Cost of vaccine"
            onChange={setCost}
          >
            <Option value={FREE}>Free</Option>
            <Option value={PAID}>Paid</Option>
          </Select>
        </Col>
      </Row>

      <Row>
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
              margin: '0 0.2rem'
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
      </Row>
      <Divider />
    </div>
  );
};
