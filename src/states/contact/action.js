import { getAPI } from "../../libs/api";

export const SET_CONTACT_DEALERS = "SET_CONTACT_DEALERS";

export const setContactDealers = (dealers) => ({
  type: SET_CONTACT_DEALERS,
  payload: dealers,
});

export const fetchContactDealers = () => {
  return async (dispatch) => {
    try {
      const dealers = await getAPI("dealer");
      dispatch(setContactDealers(dealers));
    } catch (error) {
      console.error("Failed to fetch dealer data:", error);
    }
  };
};
