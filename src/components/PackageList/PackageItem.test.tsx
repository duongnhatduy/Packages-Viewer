import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";

import PackageItem from "./PackageItem";

afterEach(cleanup);

const sample = {
  acpid: {
    package: "acpid",
    depends:
      "libc6 (>= 2.7), upstart-job, lsb-base (>= 3.2-14), module-init-tools (>> 3.1-rel-2)",
    description:
      "Advanced Configuration and Power Interface event daemon\n Modern computers support the Advanced Configuration and Power Interface (ACPI)\n to allow intelligent power management on your system and to query battery and\n configuration status.\n .\n ACPID is a completely flexible, totally extensible daemon for delivering\n ACPI events. It listens on netlink interface (or on the deprecated file\n /proc/acpi/event), and when an event occurs, executes programs to handle the\n event. The programs it executes are configured through a set of configuration\n files, which can be dropped into place by packages or by the admin."
  },
  libc6: {
    package: "libc6",
    depends: "libc-bin (= 2.15-0ubuntu10.3), libgcc1, tzdata",
    description: "Embedded GNU C Library"
  }
};

function setup(testProps: Partial<React.ComponentProps<typeof PackageItem>>) {
  const wrapper = render(
    <PackageItem list={sample} package="" {...testProps} />
  );
  return { ...wrapper };
}

test("renders correct expanded dependency", () => {
  const { getByText, queryByText, container } = setup({ package: "acpid" });
  const btn = getByText("acpid");
  expect(btn).toBeVisible();

  expect(queryByText(/Advanced Configuration and Power Interface/)).toBeNull();

  // click to expand package
  fireEvent.click(btn);
  expect(getByText(/Advanced Configuration and Power Interface/)).toBeVisible();
  expect(getByText(/libc6/)).toBeVisible();
  expect(getByText(/lsb-base not installed/)).toBeVisible();

  fireEvent.click(getByText(/libc6/));
  expect(getByText(/Embedded GNU C Library/)).toBeVisible();
  expect(container).toMatchSnapshot();
});

test("renders with reverse dependencies", () => {
  const { getByText, container } = setup({ package: "libc6" });
  const btn = getByText("libc6");
  expect(btn).toBeVisible();
  fireEvent.click(btn);

  expect(getByText(/acpid/)).toBeVisible();
  fireEvent.click(getByText(/acpid/));
  expect(getByText(/Advanced Configuration and Power Interface/)).toBeVisible();
  expect(container).toMatchSnapshot();
});
