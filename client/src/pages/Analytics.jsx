import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postData } from "../store/apiSlice";

function Analytics() {
  //get api call in useeffect with usestate add data using axioos
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = async () => {
      if (params.id) {
        dispatch(
          postData({
            url: "/api/analytics/ageByDemo",
            data: { campaignId: params.id, demo: "city" },
          })
        )
          .unwrap()
          .then((res) => {
            setCityData(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });
        dispatch(
          postData({
            url: "/api/analytics/ageByDemo",
            data: { campaignId: params.id, demo: "age" },
          })
        )
          .unwrap()
          .then((res) => {
            setAgeData(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });
        dispatch(
          postData({
            url: "/api/analytics/ageByDemo",
            data: { campaignId: params.id, demo: "gender" },
          })
        )
          .unwrap()
          .then((res) => {
            setGenderData(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    checkAuthentication();
  }, [params.id]);

  return (
    <div className="w-full py-5">
      <StockChart
        ageData={ageData}
        genderData={genderData}
        cityData={cityData}
      />
    </div>
  );
}

export default Analytics;
