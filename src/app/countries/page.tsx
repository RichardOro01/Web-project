import TableData from "@/components/commons/tables/TableData";
import { Country } from "@/interfaces/Country";
import { countryTableAdapter } from "@/interfaces/adapters/CountryAdapter";
import countryService from "@/services/tables/countries";
import { ColumnsType } from "antd/es/table";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const roles = [1]

const columns: ColumnsType<Country> = [
  {
    title: "Country name",
    dataIndex: "country_name",
    key: "country_name",
  },
];

const CountryPage = async () => {
  const session = await getServerSession(authOptions)
  const rol = session?.role_code
  if (rol&&!roles.includes(rol)) {
    return redirect("/");
  }
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
        Data={countries}
        dataToShow={countryTableAdapter(countries)}
        {...{ columns }}
      />
    </main>
  );
};

export default CountryPage;
