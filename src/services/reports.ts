import { Dayjs } from "dayjs";
import { GET } from ".";

export const reportsService = {
  getDriversWorkedGroupTour: (tourGroupCode: string) =>
    GET(`drivers_worked_group_tour/${tourGroupCode}`),
  getContractsInPeriod: (startDate: string, endDate: string) =>
    GET(`contracts-in-period?startDate=${startDate}&endDate=${endDate}`),  
};

