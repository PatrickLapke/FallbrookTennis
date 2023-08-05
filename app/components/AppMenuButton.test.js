import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import AppMenuButton from "./AppMenuButton";

describe("AppMenuButton", () => {
  it("renders the button correctly", async () => {
    const { findByTestId } = render(<AppMenuButton />);
    const button = await findByTestId("menu-button-icon");
    expect(button).toBeTruthy();
  });

  it("calls onPress callback when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<AppMenuButton onPress={onPressMock} />);
    const button = getByTestId("menu-button-icon");

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
