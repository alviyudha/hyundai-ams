import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CardImg from "./CardImg";
import { getAPI } from "../../../libs/api";
import {
  fetchModelsFailure,
  fetchModelsRequest,
  fetchModelsSuccess,
} from "../../../states/vehicles/action";

function TabsModels() {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { models, loading } = useSelector((state) => state.models);

  useEffect(() => {
    const fetchData = async (type) => {
      dispatch(fetchModelsRequest());
      try {
        const response = await getAPI(`modeldetail/${type}`);
        dispatch(fetchModelsSuccess(response));
      } catch (error) {
        dispatch(fetchModelsFailure(error));
      }
    };

    fetchData(activeTab === "all" ? "" : activeTab);
  }, [activeTab, dispatch]);

  return (
    <div className="px-4 md:px-10">
      <div className="mb-2 bg-hyundai">
        <ul
          className="flex flex-wrap text-sm md:text-md font-medium text-center"
          role="tablist"
        >
          {["all", "electrified", "SUV", "MPV"].map((tab) => (
            <li
              key={tab}
              className="mr-2 flex-1 md:flex-none"
              role="presentation"
            >
              <button
                className={`block w-full text-center p-2 md:p-4 transition-all duration-500 ${
                  activeTab === tab
                    ? "text-hyundai bg-white"
                    : "text-neutral-100 hover:text-hyundai hover:bg-white"
                }`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="default-styled-tab-content">
        <div className={`p-4 rounded-lg bg-gray-50`} role="tabpanel">
          <CardImg
            type={activeTab === "all" ? "" : activeTab}
            models={models}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

TabsModels.propTypes = {
  activeTab: PropTypes.string,
};

export default TabsModels;
