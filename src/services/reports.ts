import { GET } from ".";

export const reportsService = {
  getDriversWorkedGroupTour: (tourGroupCode: string) =>
    GET(`drivers_worked_group_tour/${tourGroupCode}`),
};
