import { portfolioReducer } from "../Redux/Reducers/portfolio-reducer";
import * as types from "../Redux/actions/actions-portfolio";
import { mockData } from "../mockData-reducer";
import expect from "expect";

describe("portfolio reducer", () => {
  it("should return the initial state", () => {
    expect(portfolioReducer(undefined, { type: "" })).toEqual({
      activities: [],
      isLoading: false,
      err: "",
    });
  });

  it("handlesGET_ACTIVITES_START", () => {
    const start = { type: types.FETCHING_ACTIVITIES };
    expect(portfolioReducer(undefined, start)).toEqual({
      activities: [],
      err: "",
      isLoading: true,
    });
  });

  it("handles GET_POST_SUCCESS", () => {
    const success = { type: types.ACTIVITIES_SUCCESS, payload: mockData };
    expect(portfolioReducer({}, success)).toEqual({
      activities: {
        family: { name: "a name" },
        people: [
          { age: 25, name: "dylan" },
          { age: 25, name: "sara" },
          { age: 10, name: "elysia" },
        ],
      },
      err: "",
      isLoading: false,
    });
  });

  it("handles GET_POST_FAIL", () => {
    const failed = {
      type: types.ACTIVITIES_FAILURE,
      payload: "there was an error tring to get activities",
    };
    expect(portfolioReducer({}, failed)).toEqual({
      err: "there was an error tring to get activities",
      isLoading: false,
    });
  });
});
