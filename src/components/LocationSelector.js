import { useContext } from "react";
import { Row, Col, Divider, Skeleton } from "antd";
import { AppContext } from "../services/AppService";
import { SelectState } from "./SelectState";
import { SelectDistrict } from "./SelectDistrict";

export const LocationSelector = () => {
  const {
    setSelectedDistrict,
    selectedState,
    setSelectedState,
    selectedDistrict,
  } = useContext(AppContext);

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
  };

  const selectDistrictProps = {
    stateId: selectedState,
    setSelectedDistrict,
    selectedDistrict,
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <h1>Select location</h1>
        </Col>
        <Col lg={12}>
          <SelectState
            handleChange={handleStateChange}
            selectedState={selectedState}
          />
        </Col>
        <Col lg={12}>
          {selectedState ? (
            <SelectDistrict {...selectDistrictProps} />
          ) : (
            <div style={{ paddingLeft: "1rem" }}>
              <Skeleton.Input style={{ width: 200 }} active size="small" />
              <Skeleton.Input
                style={{ marginTop: "10px", width: 300 }}
                active
                size="default"
              />
            </div>
          )}
        </Col>
      </Row>
      <Divider />
    </>
  );
};
