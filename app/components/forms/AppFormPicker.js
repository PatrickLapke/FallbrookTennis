import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import { ErrorMessage } from "./ErrorMessage";

function AppFormPicker({ items, name, numberOfColumns, placeholder, width }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker></AppPicker>
      <ErrorMessage></ErrorMessage>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFormPicker;
