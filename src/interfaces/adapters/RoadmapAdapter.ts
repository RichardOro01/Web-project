import dayjs from "dayjs";
import { Roadmap, EditRoadmap } from "../Roadmap";
import { Option } from "@/components/commons/forms/InputSelect";
import { timeToDate } from "@/lib/utils";

export const roadmapTableAdapter = (
  roadmaps: Roadmap[]
): TableDataType<Roadmap>[] => {
  return roadmaps.map((roadmap) => ({
    ...roadmap,
    key: `${roadmap.car.car_code}-:-${roadmap.roadmap_date}`,
    car_code: roadmap.car?.car_code,
    departure_time: roadmap.departure_time
      ? dayjs(roadmap.departure_time).format("hh:mm A")
      : null,
  }));
};

export const roadmapFormAdapter = (
  roadmap: Roadmap
): FormDataType<EditRoadmap> => ({
  roadmap_date: roadmap.roadmap_date.toString() ?? "",
  car_code: roadmap.car.car_code.toString() ?? "",
  kms: roadmap.kms?.toString() ?? "",
  departure_time: roadmap.departure_time
    ? dayjs(roadmap.departure_time).format("HH:mm")
    : "",
});

export const roadmapTypesAdapter = (
  roadmap: FormDataType<EditRoadmap>
): EditRoadmap => ({
  roadmap_date: roadmap.roadmap_date
    ? new Date(roadmap.roadmap_date)
    : new Date(),
  car_code: parseInt(roadmap.car_code ?? ""),
  kms: parseFloat(roadmap.kms),
  departure_time: timeToDate(roadmap.departure_time),
});
