import { MenuProps } from "antd";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

function useHeaderItems(){
    const {t} = useTranslation(['translation'])
    const {data} = useSession()

    const scrollItems: MenuProps["items"] = [
        {
          key: "management",
          label: t("Management",{ns:"translation"}),
        },
        {
          key: "services",
          label: t("Services",{ns:"translation"}),
        },
        {
          key: "reports",
          label: t("Reports",{ns:"translation"}),
        },
        data?.role_code==1?{
          key: "others",
          label: t("Others",{ns:"translation"}),
        }:{key: "others",
        label: '',},
      ];

      const items: MenuProps["items"] = [
        {
          key: "tables",
          type: "group",
          label: t("Tables",{ns:'translation'}),
          children: [
            {
              key: "management",
              label: t("Management",{ns:"translation"}),
              children: [
                { key: "contracts", label: t("Contract",{ns:"translation"}) },
                { key: "services", label: t("Service",{ns:"translation"}) },
                { key: "discrepancy", label: t("Discrepancy",{ns:"translation"}) },
                { key: "roadmap", label: t("Roadmap",{ns:"translation"}) },
                { key: "report", label: t("Report",{ns:"translation"})},
              ],
            },
            {
              key: "services",
              label: t("Services",{ns:"translation"}),
              children: [
                { key: "brands", label: t("Brands",{ns:"translation"}) },
                { key: "cars", label: t("Cars",{ns:"translation"}) },
                { key: "drivers", label: t("Drivers",{ns:"translation"}) },
                { key: "couples", label: t("Couples",{ns:"translation"}) },
              ],
            },
            {
              key: "reports",
              label: t("Reports",{ns:"translation"}),
              children: [
                { key: "top_3_groups", label: t("Top 3 groups activity",{ns:"translation"}) },
                { key: "top_5_drivers", label: t("Top 5 drivers activity",{ns:"translation"}) },
                { key: "top_3_countries", label: t("Top 3 countries",{ns:"translation"}) },
                { key: "free_cover", label: t("Free cover drivers",{ns:"translation"}) },
                { key: "drivers_worked_group_tour", label: t("Drivers worked group",{ns:"translation"}) },
                { key: "contracts_in_period", label: t("Contracts in period",{ns:"translation"}) },
              ],
            },
            data?.role_code==1?{
              key: "others",
              label: t("Others",{ns:"translation"}),
              children: [
                { key: "districts", label: t("District",{ns:"translation"}) },
                { key: "fuels", label: t("Fuel",{ns:"translation"}) },
                { key: "countries", label: t("Country",{ns:"translation"}) },
                { key: "months", label: t("Month",{ns:"translation"}) },
                { key: "tourist_groups", label: t("Tour group",{ns:"translation"}) },
                { key: "users", label: t("Users",{ns:"translation"}) },
              ],
            }:{key: "others",
            label: '',},
          ],
        },
      ];

      return {scrollItems,items}
}

export default useHeaderItems