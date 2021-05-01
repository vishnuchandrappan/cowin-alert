import React, { useEffect, useState } from "react";
import { api } from "../helpers/api";
import { Select } from "antd";
import { Spin } from "antd";

const { Option } = Select;

export const SelectDistrict = ({ state_id, setSelectedDistrict }) => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDistricts = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    api
      .get(`/v2/admin/location/districts/${state_id}`)
      .then((response) => {
        console.log("districts fetched", response.data);
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.log("error in fetching districts");
        setError(error.response);
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
    <>
      <h1>Select district</h1>
      {error && <div>districts list cannot be fetched</div>}
      {loading && <Spin />}
      {districts.length > 0 ? (
        <div className="states">
          <Select
            showSearch
            style={{ width: 200 }}
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
        </div>
      ) : (
        <div>no results found</div>
      )}
    </>
  );
};
