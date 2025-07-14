// hooks/useFetchArray.js
// import { useCallback, useEffect, useState } from "react";
import * as request from "@/src/ultis/config";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { setData, setHasMore, setLoading, setPage } from "../redux/dataSlice";
import { AppState } from "../redux/store";

// Array{
//   albumId: number,
//   id: number,
//   title: string,
//   url: string,
//   thumbnailUrl: string
// }

//NORMALLY (JS)

// export const useFetchArray = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchData = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://jsonplaceholder.typicode.com/photos?_start=${page * 10}&_end=${page * 10 + 10}`
//       );

//       const newData = await response.json();

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         setData((prev) => [...prev, ...newData]);
//         setPage((prev) => prev + 1);
//       }
//     } catch (e) {
//       console.error("Error fetching data: ", e);
//     } finally {
//       setLoading(false);
//     }
//   }, [page, loading, hasMore]);

//   useEffect(() => {
//     fetchData();
//   },[]);

//   return { data, loading, fetchData };
// };

//USING AXIOS (JS)
// export const useFetchArray = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchData = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     const start = page * 10;
//     const end = start + 10;

//     try {
//       const res = await request.get(`photos?_start=${start}&_end=${end}`);
//       if (res.length === 0) {
//         setHasMore(false);
//       } else {
//         setData((prev) => [...prev, ...res]);
//         setPage((prev) => prev + 1);
//       }
//     } catch (e) {
//       console.error("Error fetching:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, [loading, hasMore,page]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return { data, loading, fetchData };
// };

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
        // const withTimestamp = res.map((item: any) => ({
        //   ...item,
        //   timestamp: Date.now(),
        // }));
        dispatch(setData(res));
        dispatch(setPage(page + 1));
      }
    } catch (e) {
      console.error("Error fetching:", e);
    } finally {
      dispatch(setLoading(false));
    }
  };
