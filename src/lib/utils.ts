import { ErrorDetail } from "@/interfaces/errors/Error";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import dayjs from "dayjs";

export const timeToDate = (time: string) => {
  const match = time.match(/\d+/g);
  if (match?.length === 2) {
    const [hour, minutes] = match;
    return dayjs()
      .set("hour", parseInt(hour))
      .set("minute", parseInt(minutes))
      .toISOString();
  }
  throw new Error("Invalid time");
};

export const removeTimeA = (time: string | null) => {
  if (time) return time.slice(0, time.length - 3);
  throw new Error("Invalid time");
};

export const convertToMilitaryTime = (time: string | null) => {
  if (time) {
    let [hours, minutes] = time.slice(0, -3).split(":");
    const period = time.slice(-2);

    if (period === "PM" && hours !== "12") {
      hours = (parseInt(hours) + 12).toString();
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  }

  throw new Error("Invalid time");
};

export const handlePrismaClientUnknownRequestError = (
  error: PrismaClientUnknownRequestError
) => {
  const match = (error.stack as string).match(/PostgresError [^,]*,[^,]*/g);
  if (match) {
    return JSON.parse(
      match[0].replace("PostgresError ", "").replace(/\b(\w+):/g, '"$1":') + "}"
    ) as ErrorDetail;
  }
};
