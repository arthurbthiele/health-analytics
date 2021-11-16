import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Timeseries } from "../utilities/processData";
import { ReactElement } from "react";

export function GraphSelector({
  timeseriesCollection,
  selectedTimeseries,
  setSelectedTimeseries,
}: {
  timeseriesCollection: Record<string, Timeseries>;
  selectedTimeseries: string;
  setSelectedTimeseries: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTimeseries(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 500, padding: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="timeseries-select">Data Set</InputLabel>
        <Select
          labelId="timeseries-select-label"
          id="timeseries-select"
          value={selectedTimeseries}
          label="Select a data type to explore"
          onChange={handleChange}
        >
          {Object.values(timeseriesCollection).map((timeseries, index) => (
            <MenuItem value={timeseries.type} key={index}>
              {timeseries.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
