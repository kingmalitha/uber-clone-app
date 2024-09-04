import { Driver } from "@/types/type";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getDrivers = async () => {
  const response = await axios.get<Driver[]>("/(api)/drivers");

  return response.data;
};

export const getAllDriversQuery = queryOptions({
  queryKey: ["drivers"],
  queryFn: getDrivers,
});
