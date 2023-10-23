import contract from "@/assets/icons/items/contract-sign-line.svg";
import brand from "@/assets/icons/items/brand.svg";
import car from "@/assets/icons/items/car.svg";
import city from "@/assets/icons/items/city.svg";
import couple from "@/assets/icons/items/couple-user.svg";
import fuel from "@/assets/icons/items/fuel-gas-station.svg";
import geography from "@/assets/icons/items/geography.svg";
import id from "@/assets/icons/items/id-card.svg";
import report from "@/assets/icons/items/report-text.svg";
import road from "@/assets/icons/items/road-map-and-pin.svg";
import service from "@/assets/icons/items/service.svg";
import tourist from "@/assets/icons/items/tourist.svg";
import OptionSection from "@/components/main/OptionSection";
import OptionItem from "@/components/main/OptionItem";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-6 ml-3  p-5">
      <OptionSection name="Management">
        <>
          <OptionItem name="Contract" img={contract} link="./contracts" />
          <OptionItem name="Service" img={service} link="./services" />
          <OptionItem
            name="Discrepancy"
            img={report}
            link="./tables/discrepancies.html"
          />
          <OptionItem name="Roadmap" img={road} link="./tables/roadmaps.html" />
        </>
      </OptionSection>
      <OptionSection name="Services">
        <>
          <OptionItem name="Brands" img={brand} link="./brands" />
          <OptionItem name="Cars" img={car} link="./cars" />
          <OptionItem name="Drivers" img={id} link="./drivers" />
          <OptionItem
            name="Couples"
            img={couple}
            link="./couples"
          />
        </>
      </OptionSection>
      <OptionSection name="Others">
        <>
          <OptionItem name="District" img={city} link="./" />
          <OptionItem name="Fuel" img={fuel} link="./" />
          <OptionItem name="Country" img={geography} link="./" />
          <OptionItem name="Tour group" img={tourist} link="./" />
        </>
      </OptionSection>
    </main>
  );
}
