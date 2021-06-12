import React, { useEffect, useState } from "react";
import { api } from "../helpers/api";
import { Alert, Col, Row, Select } from "antd";
import { Spin } from "antd";

const { Option } = Select;

export const SelectDistrict = ({ state_id, setSelectedDistrict }) => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDistricts = () => {
    if (loading) return;
    setLoading(true);

    api
      .get(`/v2/admin/location/districts/${state_id}`)
      .then((response) => {
        console.log("districts fetched", response.data);
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.log("error in fetching districts");
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDistricts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state_id]);

  const handleChange = (value) => {
    setSelectedDistrict(value);
  };

  return (
    <Row style={{ width: '100%' }}>
      <Col span={24}>
        <h3>Select district {loading && <Spin style={{ display: 'inline' }} />}</h3>
      </Col>

      {districts.length > 0 ? (
        <Col span={24} className="states">
          <Select
            showSearch
            style={{
              width: "100%",
              margin: '0 0.2rem'
            }}
            placeholder="Districts"
            optionFilterProp="children"
            onChange={handleChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {districts.map((district) => (
              <Option value={district.district_id} key={district.district_id}>
                {district.district_name}
              </Option>
            ))}
          </Select>
        </Col>
      ) : (
        <Alert
          message="no results found"
          type="error"
          showIcon
        />
      )}
    </Row>
  );
};
