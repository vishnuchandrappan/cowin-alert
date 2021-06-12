import { Fragment, useContext } from "react";
import { AppContext } from "../services/AppService";
import { Row, Col, Divider, Skeleton } from "antd";
import { SelectState } from "./SelectState";
import { SelectDistrict } from "./SelectDistrict";

export const LocationSelector = () => {
  const { setSelectedDistrict, selectedState, setSelectedState } =
    useContext(AppContext);

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
  };

  const selectDistrictProps = {
    state_id: selectedState,
    setSelectedDistrict,
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <h1>Select location</h1>
        </Col>
        <Col lg={12}>
          <SelectState handleChange={handleStateChange} />
        </Col>
        <Col lg={12}>
          {selectedState ? (
            <SelectDistrict {...selectDistrictProps} />
          ) : (
            <div style={{ paddingLeft: '1rem' }}>
              <Skeleton.Input
                style={{ width: 200 }}
                active={true}
                size="small"
              />
              <Skeleton.Input
                style={{ marginTop: '10px', width: 300 }}
                active={true}
                size="default"
              />
            </div>
          )}
        </Col>
      </Row>
      <Divider />
    </Fragment>
  );
};
