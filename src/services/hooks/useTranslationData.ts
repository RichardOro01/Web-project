import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

function useTranslationData (title:string,dataToShow:TableDataType<any>[]) {

  const [dataTranslated,setDataTranslated] = useState(dataToShow)
  const {t} = useTranslation([title])

  const getTranslation = useCallback(() => {
    if(title=="Fuels"){
      setDataTranslated(dataToShow.map((item:any) =>{return {...item, fuel_name:t(item?.fuel_name,{ns:title})}}))
    }
    else if(title=="Services"){
      setDataTranslated(dataToShow.map((item:any)=>{
        return {
          ...item,
          service_name:t(item?.service_name,{ns:title}),
          pickup_place:t(item?.pickup_place,{ns:title}),
          country_name:t(item?.country_name,{ns:'Countries'}),
          group_name:t(item?.group_name,{ns:'Groups'}),
        }
      }))
    }
    else if(title=="Countries"){ setDataTranslated(dataToShow.map((item:any) =>{return {...item, country_name:t(item?.country_name,{ns:title})}}))}
    else if(title=="Groups"){ setDataTranslated(dataToShow.map((item:any) =>{return {...item, group_name:t(item?.group_name,{ns:title})}}))}
    else if(title=="Brands"){ setDataTranslated(dataToShow.map((item:any) =>{return {...item, fuel_name:t(item?.fuel_name,{ns:'Fuels'})}}))}
  }, [title]);

  useEffect(()=>{
    getTranslation()
  },[getTranslation])

  return {data:dataTranslated}  
}

export default useTranslationData