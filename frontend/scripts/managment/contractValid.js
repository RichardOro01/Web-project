import { verifyDate, verifyDirection, verifyName, verifyNumber } from "../utils/verify";

{
    let applicant = document.getElementById("applicant");
    verifyName(applicant)
}
{
    let start = document.getElementById("start");
    verifyDate(start)
}
{
    let end = document.getElementById("end");
    verifyDate(end)
}
{
    let kms = document.getElementById("kms");
    verifyNumber(kms)
}
{
    let phone = document.getElementById("amount");
    verifyNumber(phone)
}
{
    let country = document.getElementById("country");
    verifyName(country)
}
{
    let fleet = document.getElementById("fleet");
    verifyNumber(fleet)
}
