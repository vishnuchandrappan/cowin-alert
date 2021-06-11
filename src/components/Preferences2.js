import React from "react";
import { Row, Col, InputNumber, Tooltip, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FREE, PAID } from "./AHome";

const { Option } = Select;

export const Preferences = ({
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
}) => {
  return (
    <Modal
      title="Preferences"
      okText={"Save preferences"}
      visible={showPreferences}
      onOk={hidePreferences}
      onCancel={hidePreferences}
    >
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
            }}
            placeholder="Refresh time"
            value={refreshTime}
            onChange={setRefreshTime}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Tooltip
            title={`If available number of sessions is greater than ${threshold}, you'll get an alert`}
          >
            <span>Threshold value</span>
          </Tooltip>
        </Col>
        <Col span={16}>
          <InputNumber
            min={1}
            style={{
              width: "100%",
            }}
            placeholder="Threshold value"
            value={threshold}
            onChange={setThreshold}
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
            <span>Limit age ? (45+)</span>
          </Tooltip>
        </Col>
        <Col span={16}>
          <Select
            style={{
              width: "100%",
            }}
            value={minAgeLimit}
            placeholder="Do you want to filter search results? (Age 45+) "
            onChange={setMinAgeLimit}
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  );
};
