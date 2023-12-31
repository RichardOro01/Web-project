import i18n from 'i18next'
import { initReactI18next } from "react-i18next";

//English
import en from "../../lang/en.json"
import brandEn from "../../lang/brands/en.json"
import carEn from "../../lang/cars/en.json"
import driverEn from "../../lang/drivers/en.json"
import coupleEn from "../../lang/couples/en.json"
import districtsEn from "../../lang/districts/en.json"
import fuelEn from "../../lang/fuels/en.json"
import countryEn from "../../lang/countrys/en.json"
import monthEn from "../../lang/months/en.json"
import groupEn from "../../lang/groups/en.json"
import userEn from "../../lang/users/en.json"
import serviceEn from "../../lang/services/en.json"
import reportEn from "../../lang/report/en.json"
import contractEn from "../../lang/contract/en.json"

//Español
import es from "../../lang/es.json"
import brandEs from "../../lang/brands/es.json"
import carEs from "../../lang/cars/es.json"
import driverEs from "../../lang/drivers/es.json"
import coupleEs from "../../lang/couples/es.json"
import districtsEs from "../../lang/districts/es.json"
import fuelEs from "../../lang/fuels/es.json"
import countryEs from "../../lang/countrys/es.json"
import monthEs from "../../lang/months/es.json"
import groupEs from "../../lang/groups/es.json"
import userEs from "../../lang/users/es.json"
import serviceEs from "../../lang/services/es.json"
import reportEs from "../../lang/report/es.json"
import contractEs from "../../lang/contract/es.json"

const resources = {
    en:{
      translation: en,
      Brands:brandEn,
      Cars:carEn,
      Drivers:driverEn,
      Couple:coupleEn,
      Districts:districtsEn,
      Fuels:fuelEn,
      Countries:countryEn,
      Months:monthEn,
      Groups:groupEn,
      Users:userEn,
      Services:serviceEn,
      Reports:reportEn,
      Contracts:contractEn
    },
    es: {
      translation: es,
      Brands:brandEs,
      Cars:carEs,
      Drivers:driverEs,
      Couple:coupleEs,
      Districts:districtsEs,
      Fuels:fuelEs,
      Countries:countryEs,
      Months:monthEs,
      Groups:groupEs,
      Users:userEs,
      Services:serviceEs,
      Reports:reportEs,
      Contracts:contractEs
    }
  };

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng:"en",
        interpolation: {
          escapeValue: false // react already safes from xss
        }
    });

export default i18n