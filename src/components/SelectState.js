import { Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { api } from "../helpers/api";

const { Option } = Select;

export const SelectState = ({ handleChange }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStates = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    api
      .get("/v2/admin/location/states")
      .then((response) => {
        console.log("states fetched", response.data);
        setStates(response.data.states);
      })
      .catch((error) => {
        console.log("error in fetching states");
        setError(error.response);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Select state</h1>
      {error && <div>states list cannot be fetched</div>}
      {loading && <Spin />}
      {states.length > 0 ? (
        <div className="states">
          <Select
            showSearch
            style={{ width: 200 }}
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
        </div>
      ) : (
        <div>no results found</div>
      )}
    </>
  );
};
