import dayjs from 'dayjs';
import { Discrepancy, EditDiscrepancy } from '../Discrepancy'

export const discrepancyTableAdapter = (discrepancies: Discrepancy[]): TableDataType<Discrepancy>[] =>{
    return discrepancies.map((discrepancy) => ({
        ...discrepancy,
        key: `${discrepancy.car.car_code}-:-${discrepancy.months.month_code}`,
        car_code: discrepancy.car?.car_code,
        month_code: dayjs( discrepancy.months?.month_code).format('YYYY-MM'),
    }));
};

export const discrepancyFormAdapter = (
    discrepancy: Discrepancy): FormDataType<EditDiscrepancy> => ({
  month_code: discrepancy.months.month_code.toString() ?? "",
  planned_kms: discrepancy.planned_kms?.toString() ?? "",
  tours_kms: discrepancy.tours_kms?.toString() ?? "",
  difference_kms: discrepancy.difference_kms?.toString() ?? "",
  planned_fuel: discrepancy.planned_fuel?.toString() ?? "",
  consumed_fuel : discrepancy.consumed_fuel?.toString() ?? "",
  dif_spending_fuel : discrepancy.dif_spending_fuel?.toString() ?? "",
  car_code: discrepancy.car.car_code.toString() ?? "", 
});

export const discrepancyTypesAdapter = (
    discrepancy: FormDataType<EditDiscrepancy>
): EditDiscrepancy => ({
  month_code: discrepancy.month_code ? new Date(discrepancy.month_code) : new Date(),
  planned_kms: parseFloat(discrepancy.planned_kms),
  tours_kms: parseFloat(discrepancy.tours_kms),
  difference_kms: parseFloat(discrepancy.difference_kms),
  planned_fuel: parseFloat(discrepancy.planned_fuel),
  consumed_fuel : parseFloat(discrepancy.consumed_fuel),
  dif_spending_fuel : parseFloat(discrepancy.dif_spending_fuel),
  car_code: parseInt(discrepancy.car_code ?? ""), 
});