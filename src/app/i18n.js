import i18n from 'i18next'
import { initReactI18next } from "react-i18next";

import es from "../../lang/es.json"
import brand from "../../lang/brands/es.json"
import car from "../../lang/cars/es.json"
import driver from "../../lang/drivers/es.json"
import couple from "../../lang/couples/es.json"
import districts from "../../lang/districts/es.json"
import fuel from "../../lang/fuels/es.json"
import country from "../../lang/countrys/es.json"
import month from "../../lang/months/es.json"
import group from "../../lang/groups/es.json"
import user from "../../lang/users/es.json"
import service from "../../lang/services/es.json"
import report from "../../lang/report/es.json"
import contract from "../../lang/contract/es.json"

const resources = {
    es: {
      translation: es,
      Brands:brand,
      Cars:car,
      Drivers:driver,
      Couple:couple,
      Districts:districts,
      Fuels:fuel,
      Countries:country,
      Months:month,
      Groups:group,
      Users:user,
      Services:service,
      Reports:report,
      Contracts:contract
    }
  };

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng:"es",
        interpolation: {
          escapeValue: false // react already safes from xss
        }
    });

export default i18n