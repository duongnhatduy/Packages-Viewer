import React, { useState } from "react";
import { TPackage } from "./types";

type TPackageItemProps = {
  package: string;
  list: {
    [name: string]: TPackage;
  };
};

export default function PackageItem({
  package: name,
  list
}: TPackageItemProps) {
  const [isExpanded, setExpanded] = useState(false);
  const currentPackage = list[name];
  const { depends = "", description = "" } = currentPackage || {};

  if (!currentPackage) {
    return <div>{name} not installed</div>;
  }

  return (
    <>
      <button onClick={() => setExpanded(!isExpanded)}>{name}</button>
      {isExpanded && (
        <div>
          {description}
          {!!depends && (
            <>
              <h2>Dependencies</h2>
              <ul>
                {getDependencies(depends).map(dependency => (
                  <li key={dependency}>
                    <PackageItem package={dependency} list={list} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}

/**
 *
 * @param depends
 * @description get dependencies name from depends field
 * @example "libc6 (>= 2.7), upstart-job" will return ["libc6", "upstart-job"]
 */
function getDependencies(depends: string): string[] {
  return depends.split(", ").map(dependency => dependency.split(" ")[0]);
}
