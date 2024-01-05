import dayjs from "dayjs";

export interface ContractInPeriod {
    contract_code: number;
    applicant_name: string;
    start_date: Date;
    end_date: Date;
    contract_kms: number;
    contract_amount: number;
    country_name: string;
    fleet_number: number;
}

export const contractInPeriodTableAdapter = (contracts: ContractInPeriod[]): TableDataType<ContractInPeriod>[] => {
    return contracts.map((contract) => ({
        key: contract.contract_code,
        applicant_name: contract.applicant_name,
        contract_kms: contract.contract_kms,
        contract_amount: contract.contract_amount,
        country_name: contract.country_name,
        fleet_number: contract.fleet_number,
        start_date: contract.start_date
        ? dayjs(contract.start_date).format("YYYY-MM-DD")
        : "",
      end_date: contract.end_date
        ? dayjs(contract.end_date).format("YYYY-MM-DD")
        : "",
    }));
  };