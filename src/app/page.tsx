"use client"
import contract from "@/assets/icons/items/contract-sign-line.svg";
import brand from "@/assets/icons/items/brand.svg";
import car from "@/assets/icons/items/car.svg";
import city from "@/assets/icons/items/city.svg";
import couple from "@/assets/icons/items/couple-user.svg";
import fuel from "@/assets/icons/items/fuel-gas-station.svg";
import geography from "@/assets/icons/items/geography.svg";
import id from "@/assets/icons/items/id-card.svg";
import discrepancy from "@/assets/icons/items/report-text.svg";
import report from "@/assets/icons/items/report.svg";
import road from "@/assets/icons/items/road-map-and-pin.svg";
import service from "@/assets/icons/items/service.svg";
import tourist from "@/assets/icons/items/tourist.svg";
import users from "@/assets/icons/items/user.svg";
import role from "@/assets/icons/items/role.svg";
import OptionSection from "@/components/main/OptionSection";
import OptionItem from "@/components/main/OptionItem";
import bxs from "@/assets/icons/items/bxs-calendar.svg";
import free_code from "@/assets/icons/items/free_cover.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n"
import { useEffect } from "react";

export default function Home() {

  const {t} = useTranslation(["translation"])
  
  return (
    <main className="flex flex-col items-center gap-6 ml-3  p-5">
      <OptionSection name={t("Management",{ns:'translation'})}>
        <>
          <OptionItem name={t("Contract",{ns:'translation'})} img={contract} link="./contracts" />
          <OptionItem name={t("Service",{ns:'translation'})} img={service} link="./services" />
          <OptionItem
            name={t("Discrepancy",{ns:'translation'})}
            img={discrepancy}
            link="./discrepancies"
          />
          <OptionItem name={t("Roadmap",{ns:'translation'})} img={road} link="./roadmaps" />
          <OptionItem name={t("Report",{ns:'translation'})} img={report} link="./reports" />
        </>
      </OptionSection>
      <OptionSection name={t("Services",{ns:'translation'})}>
        <>
          <OptionItem name={t("Brands",{ns:'translation'})} img={brand} link="./brands" />
          <OptionItem name={t("Cars",{ns:'translation'})} img={car} link="./cars" />
          <OptionItem name={t("Drivers",{ns:'translation'})} img={id} link="./drivers" />
          <OptionItem name={t("Couples",{ns:'translation'})} img={couple} link="./couples" />
        </>
      </OptionSection>
      <OptionSection name={t("Reports",{ns:"translation"})}>
        <>
          <OptionItem name={t("Top 3 groups activity",{ns:"translation"})} img={city} link="./top_3_groups" />
          <OptionItem name={t("Top 5 drivers activity",{ns:"translation"})} img={city} link="./top_5_drivers" />
          <OptionItem name={t("Top 3 countries activity",{ns:"translation"})} img={city} link="./top_3_countries" />
          <OptionItem name={t("Free cover drivers",{ns:"translation"})} img={free_code} link="/free_cover" />
          <OptionItem name="Drivers worked group tour" img={city} link="./drivers_worked_group_tour" />
        </>
      </OptionSection>
      <OptionSection name={t("Others",{ns:'translation'})}>
        <>
          <OptionItem name={t("District",{ns:'translation'})} img={city} link="./districts" />
          <OptionItem name={t("Fuel",{ns:'translation'})} img={fuel} link="./fuels" />
          <OptionItem name={t("Country",{ns:'translation'})} img={geography} link="./countries" />
          <OptionItem name={t("Month",{ns:'translation'})} img={bxs} link="./months" />
          <OptionItem name={t("Tour group",{ns:'translation'})} img={tourist} link="./tourist_groups" />
          <OptionItem name={t("Users",{ns:'translation'})} img={users} link="./users" />
        </>
      </OptionSection>
    </main>
  );
}
