import { Contract, CreateContract, EditContract } from "../Contract";
import dayjs from "dayjs";

export const contractTableAdapter = (
  contracts: Contract[]
): TableDataType<Contract>[] => {
  return contracts.map((contract) => ({
    ...contract,
    key: contract.contract_code,
    country_name: contract.country?.country_name,
    fleet_number: contract.fleet_number?.fleet_number,
    start_date: contract.start_date
      ? dayjs(contract.start_date).format("YYYY-MM-DD")
      : null,
    end_date: contract.end_date
      ? dayjs(contract.end_date).format("YYYY-MM-DD")
      : null,
  }));
};

export const contractFormAdapter = (
  contract: Contract
): FormDataType<EditContract> => ({
  contract_code: contract.contract_code.toString(),
  applicant_name: contract.applicant_name ?? "",
  start_date: contract.start_date
    ? dayjs(contract.start_date).format("YYYY-MM-DD")
    : "",
  end_date: contract.end_date
    ? dayjs(contract.end_date).format("YYYY-MM-DD")
    : "",
  contract_kms: contract.contract_kms?.toString() ?? "",
  contract_amount: contract.contract_amount?.toString() ?? "",
  country_code: contract.country?.country_code,
  car_code: contract.fleet_number?.number.toString() ?? "",
});

export const contractTypesAdapter = (
  contract: FormDataType<EditContract>
): EditContract => ({
  contract_code: parseInt(contract.contract_code),
  applicant_name: contract.applicant_name,
  start_date: contract.start_date,
  end_date: contract.end_date,
  contract_kms: parseFloat(contract.contract_kms),
  contract_amount: parseFloat(contract.contract_amount),
  country_code: contract.country_code,
  car_code: parseInt(contract.car_code ?? ""),
});

export const contractCreateAdapter = (
  contract: EditContract
): CreateContract => ({
  applicant_name: contract.applicant_name,
  start_date: contract.start_date,
  end_date: contract.end_date,
  contract_kms: contract.contract_kms,
  contract_amount: contract.contract_amount,
  country_code: contract.country_code,
  car_code: contract.car_code,
});
