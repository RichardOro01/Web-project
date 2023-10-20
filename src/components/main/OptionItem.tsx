import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/main.module.css";

interface OptionItemProps {
  name: string;
  img: StaticImageData;
  link: string;
}

const OptionItem: React.FC<OptionItemProps> = ({ img, name, link }) => {
  const regexp = img.src.match(/\/[\w\d-_]+\./);
  let alt = "item";
  if (regexp) {
    alt = regexp[0].slice(1, regexp[0].length - 1);
  }
  return (
    <Link href={link} className={styles["box-container"]}>
      <Image src={img} {...{ alt }} />
      <h2 className="text-xl font-semibold">{name}</h2>
    </Link>
  );
};

export default OptionItem;
