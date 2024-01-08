import { useCallback, useEffect } from "react";
import i18n from "../i18n";
import { getCookie, setCookie } from "@/services/utils/cookies";

function useLanguageControl (language:string,setLanguajeTransBus:any) {
  
    const getTranslation = useCallback(() => {
        if(language){
            i18n.changeLanguage(language);
            setCookie("languageTransBus", language?.toString(), 365,'');
            setLanguajeTransBus(language)
        }
        else{
            const cookie = getCookie("languageTransBus")?.toString()
            if(cookie){
                setLanguajeTransBus(cookie)
            }
            else{
                setCookie("languageTransBus", 'en', 365,'');
                setLanguajeTransBus('en')  
            }
        }
    }, [language]);
  
    useEffect(()=>{
        getTranslation()
    },[getTranslation]) 
}

export default useLanguageControl