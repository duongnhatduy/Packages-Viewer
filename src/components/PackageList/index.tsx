import React from "react";
import { TPackage } from "./types";
import PackageItem from "./PackageItem";

type TPackageListProps = {
  list: {
    [name: string]: TPackage;
  };
};

export const PackageList = ({ list }: TPackageListProps) => {
  return (
    <ul>
      {Object.keys(list)
        .sort()
        .map(name => (
          <li key={name}>
            <PackageItem list={list} package={name} />
          </li>
        ))}
    </ul>
  );
};
