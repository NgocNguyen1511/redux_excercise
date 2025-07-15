import * as request from "@/src/ultis/config";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { setData, setHasMore, setLoading, setPage } from "../redux/dataSlice";
import { AppState } from "../redux/store";

// USING AXIOS(from config.js) WITH REDUX THUNK (TS)
export const fetchData =
  (): ThunkAction<Promise<void>, AppState, null, Action<string>> =>
  async (dispatch, getState) => {
    const { loading, hasMore, page } = getState().data;

    if (loading || !hasMore) return;

    dispatch(setLoading(true));

    const start = page * 10;
    const end = start + 10;

    try {
      const res = await request.get(`photos?_start=${start}&_end=${end}`);
      if (res.length === 0) {
        dispatch(setHasMore(false));
      } else {
        dispatch(setData(res));
        dispatch(setPage(page + 1));
      }
    } catch (e) {
      console.error("Error fetching:", e);
    } finally {
      dispatch(setLoading(false));
    }
  };
