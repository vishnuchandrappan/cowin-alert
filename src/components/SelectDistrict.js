import { useContext, useEffect, useState } from "react";
import { Alert, Col, Row, Select, Spin } from "antd";

import { api } from "../helpers/api";
import { StorageContext } from "../services/StorageService";
import { DISTRICTS } from "../helpers/constants";

const { Option } = Select;

export const SelectDistrict = ({ stateId, setSelectedDistrict }) => {
  const { setItem, getItem } = useContext(StorageContext);

  const [districts, setDistricts] = useState(getItem(DISTRICTS) || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItem(DISTRICTS, districts);
  }, [districts, setItem]);

  const fetchDistricts = () => {
    if (loading) return;
    setLoading(true);

    api
      .get(`/v2/admin/location/districts/${stateId}`)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (districts.length === 0) {
      fetchDistricts();
    }
  }, [stateId]);

  const handleChange = setSelectedDistrict;

  return (
    <Row style={{ width: "100%" }}>
      <Col span={24}>
        <h3>
          Select district {loading && <Spin style={{ display: "inline" }} />}
        </h3>
      </Col>

      {districts.length > 0 ? (
        <Col span={24} className="states">
          <Select
            showSearch
            style={{
              width: "100%",
              margin: "0 0.2rem",
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
        <Alert message="no results found" type="error" showIcon />
      )}
    </Row>
  );
};
