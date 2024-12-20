"use client"

import { useCallback, useState } from "react";
import { FetchResponse } from "./types/common";

export const useFetch= <T,>(url: string) => {
    const [data, setData] = useState<T>([] as T);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<FetchResponse<T> | null>(null);
    const fetchData = useCallback(async(config?: RequestInit) => {
      setLoading(true);
      try {
        const response = await fetch(process.env.PUBLIC_URL + url, config);
        console.log(response, "response");
        
        const jsonData: FetchResponse<T> = await response.json();
        setResponse(jsonData)
        setData(jsonData.response.data);
        setSuccess(jsonData.response.success);
      } catch (error) {
        alert(JSON.stringify(error))
        setError(error as Error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    }, [url]);
  
    return { data, response, loading, error, fetchData, success };
}