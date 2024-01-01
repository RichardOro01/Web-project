import { Contract, CreateContract, EditContract } from "../Contract";
import dayjs from "dayjs";

export const contractTableAdapter = (
  contracts: Contract[]
): TableDataType<Contract>[] => {
  return contracts.map((contract) => ({
    key: contract.contract_code,
    applicant_name: contract.applicant_name || "",
    contract_kms: contract.contract_kms || "",
    contract_amount: contract.contract_amount || "",
    country_name: contract.country?.country_name,
    plate: contract.car?.plate || "",
    start_date: contract.start_date
      ? dayjs(contract.start_date).format("YYYY-MM-DD")
      : "",
    end_date: contract.end_date
      ? dayjs(contract.end_date).format("YYYY-MM-DD")
      : "",
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
  contract_country: contract.country?.country_code,
  car_code: contract.car?.car_code.toString() ?? "",
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
  contract_country: contract.contract_country,
  car_code: parseInt(contract.car_code ?? ""),
});

export const contractCreateAdapter = (
  contract: EditContract
): CreateContract => ({
  applicant_name: contract.applicant_name,
  start_date: dayjs(contract.start_date).toISOString(),
  end_date: dayjs(contract.end_date).toISOString(),
  contract_kms: contract.contract_kms,
  contract_amount: contract.contract_amount,
  contract_country: contract.contract_country,
  car_code: contract.car_code,
});
