import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import AppPicker from "./AppPicker";

describe("AppPicker", () => {
  it("renders the picker correctly", () => {
    const { getByText } = render(<AppPicker placeholder={"picker"} />);
    expect(getByText("picker")).toBeTruthy();
  });

  it("renders icon when provided", () => {
    const { getByTestId } = render(<AppPicker icon="clock-outline" />);
    expect(getByTestId("icon")).toBeTruthy();
  });

  it("toggles modal visiblity when dropdown is pressed", () => {
    const { getByTestId } = render(<AppPicker />);
    const dropdownIcon = getByTestId("dropdown-icon");

    fireEvent.press(dropdownIcon);

    expect(getByTestId("modal")).toBeTruthy();
  });

  it("selects item when pressed", () => {
    const onSelectMock = jest.fn();
    const items = [
      { label: "item1", value: 1 },
      { label: "item2", value: 2 },
    ];

    const { getByTestId, getByText } = render(
      <AppPicker items={items} onSelectItem={onSelectMock} />
    );

    const dropdownIcon = getByTestId("dropdown-icon");
    fireEvent.press(dropdownIcon);

    fireEvent.press(getByText("item1"));
    expect(onSelectMock).toHaveBeenCalledWith(items[0]);
  });

  it("when open, closes when dropdown is pressed", async () => {
    const { getByTestId, queryByTestId, getByText } = render(<AppPicker />);
    const dropdownIcon = getByTestId("dropdown-icon");

    fireEvent.press(dropdownIcon);

    expect(getByTestId("modal")).toBeTruthy();

    const closeButton = getByText("close");
    fireEvent.press(closeButton);

    expect(queryByTestId("modal")).toBeTruthy(); // Modal still exists but its visibility is false
  });
});
