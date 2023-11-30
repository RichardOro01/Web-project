import TableData from "@/components/commons/tables/TableData";
import { Country } from "@/interfaces/Country";
import { countryTableAdapter } from "@/interfaces/adapters/CountryAdapter";
import countryService from "@/services/tables/countries";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Country> = [
  {
    title: "Country name",
    dataIndex: "country_name",
    key: "country_name",
  },
];

const CountryPage = async () => {
  let countries: Country[] = [];
  try {
    countries = await countryService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Countries"
        modal="countries"
        data={countries}
        dataToShow={countryTableAdapter(countries)}
        {...{ columns }}
      />
    </main>
  );
};

export default CountryPage;
