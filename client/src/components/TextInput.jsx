import { TextField } from "@mui/material";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export const TextInput = forwardRef(({ loadedInput, label, rows }, _ref) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (loadedInput !== undefined) {
      setValue(loadedInput);
    }
  }, [loadedInput]);

  useImperativeHandle(_ref, () => {
    return { value };
  });

  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      align="center"
      value={value}
      multiline={!!rows}
      fullWidth
      rows={rows}
      onChange={(event) => setValue(event.target.value)}
    />
  );
});

TextInput.displayName = "TextInput";
