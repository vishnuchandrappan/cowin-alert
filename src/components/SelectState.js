import { Alert, Col, Row, Select, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { api } from "../helpers/api";
import { STATES } from "../helpers/constants";
import { StorageContext } from "../services/StorageService";

const { Option } = Select;

export const SelectState = ({ handleChange }) => {
  const { getItem, setItem } = useContext(StorageContext);

  const [states, setStates] = useState(getItem(STATES) || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItem(STATES, states);
  }, [states, setItem]);

  const fetchStates = () => {
    if (loading) return;
    setLoading(true);

    api
      .get("/v2/admin/location/states")
      .then((response) => {
        setStates(response.data.states);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (states.length === 0) {
      fetchStates();
    }
  }, []);

  return (
    <Row style={{ width: "100%" }}>
      <Col span={24}>
        <h3>
          Select state {loading && <Spin style={{ display: "inline" }} />}{" "}
        </h3>
      </Col>

      {states.length > 0 ? (
        <Col span={24} className="states">
          <Select
            showSearch
            style={{
              width: "100%",
              margin: "0 0.2rem",
            }}
            placeholder="States"
            optionFilterProp="children"
            onChange={handleChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {states.map((state) => (
              <Option value={state.state_id} key={state.state_id}>
                {state.state_name}
              </Option>
            ))}
          </Select>
        </Col>
      ) : (
        <Alert message="no results found" type="error" showIcon />
      )}
    </Row>
  );
};
