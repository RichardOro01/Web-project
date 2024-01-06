import { Dayjs } from "dayjs";
import { GET } from ".";

export const reportsService = {
  getDriversWorkedGroupTour: (tourGroupCode: string) =>
    GET(`drivers_worked_group_tour/${tourGroupCode}`),
  getContractsInPeriod: (startDate: string, endDate: string) =>
    GET(`contracts-in-period?startDate=${startDate}&endDate=${endDate}`),
  getTouristGroupActivities: (startDate: string, endDate: string, tourGroupCode: string) =>
    GET(`tourist_groups_activities?startDate=${startDate}&endDate=${endDate}&tourGroupCode=${tourGroupCode}`),     
};

