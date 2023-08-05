import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import AppButton from "./AppButton";

describe("AppButton", () => {
  it("renders the button correctly", () => {
    const { getByText } = render(<AppButton title="click" />);
    expect(getByText("click")).toBeTruthy();
  });

  it("calls onPress callback when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AppButton title="click" onPress={onPressMock} />
    );
    const button = getByText("click");

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
