import contract from "@/assets/icons/items/contract.svg";
import brand from "@/assets/icons/items/brand.svg";
import car from "@/assets/icons/items/car.svg";
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
import OptionSection from "@/components/main/OptionSection";
import OptionItem from "@/components/main/OptionItem";
import bxs from "@/assets/icons/items/bxs-calendar.svg";
import free_code from "@/assets/icons/items/free_cover.svg";
import suitcase from "@/assets/icons/items/suitcase.svg";
import bus from "@/assets/icons/items/bus.svg";
import world from "@/assets/icons/items/world.svg";
import group from "@/assets/icons/items/group.svg";
import coin from "@/assets/icons/items/coin.svg";
import district from "@/assets/icons/items/district.svg"

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-6 ml-3  p-5">
      <OptionSection name="Management">
        <>
          <OptionItem name="Contract" img={contract} link="./contracts" />
          <OptionItem name="Service" img={service} link="./services" />
          <OptionItem
            name="Discrepancy"
            img={discrepancy}
            link="./discrepancies"
          />
          <OptionItem name="Roadmap" img={road} link="./roadmaps" />
          <OptionItem name="Report" img={report} link="./reports" />
        </>
      </OptionSection>
      <OptionSection name="Services">
        <>
          <OptionItem name="Brands" img={brand} link="./brands" />
          <OptionItem name="Cars" img={car} link="./cars" />
          <OptionItem name="Drivers" img={id} link="./drivers" />
          <OptionItem name="Couples" img={couple} link="./couples" />
          <OptionItem name="Free Cover" img={free_code} link="" />
        </>
      </OptionSection>
      <OptionSection name="Reports">
        <>
          <OptionItem name="Top 3 groups activity" img={suitcase} link="./top_3_groups" />
          <OptionItem name="Top 5 drivers activity" img={bus} link="./top_5_drivers" />
          <OptionItem name="Top countries activity" img={world} link="./top_3_countries" />
          <OptionItem name="Drivers worked group" img={group} link="./drivers_worked_group_tour" />
          <OptionItem name="Contracts in period" img={coin} link="./contracts_in_period" />
        </>
      </OptionSection>
      <OptionSection name="Others">
        <>
          <OptionItem name="District" img={district} link="./districts" />
          <OptionItem name="Fuel" img={fuel} link="./fuels" />
          <OptionItem name="Country" img={geography} link="./countries" />
          <OptionItem name="Month" img={bxs} link="./months" />
          <OptionItem name="Tour group" img={tourist} link="./tourist_groups" />
          <OptionItem name="Users" img={users} link="./users" />
        </>
      </OptionSection>
    </main>
  );
}
