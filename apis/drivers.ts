import { Driver } from "@/types/type";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getDrivers = async () => {
  const response = await axios.get<Driver[]>("api/driver");

  console.log(`data from getDrivers: ${response.data}`);

  return response.data;
};

export const getAllDriversQuery = queryOptions({
  queryKey: ["drivers"],
  queryFn: getDrivers,
});
