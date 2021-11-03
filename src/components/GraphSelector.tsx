import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TimeSeriesCollection } from "../utilities/processData";
import { ReactElement } from "react";

export default function GraphSelector({
  timeSeriesCollection,
  selectedTimeSeries,
  setSelectedTimeSeries,
}: {
  timeSeriesCollection: TimeSeriesCollection;
  selectedTimeSeries: string;
  setSelectedTimeSeries: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTimeSeries(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="timeseries-select">Age</InputLabel>
        <Select
          labelId="timeseries-select-label"
          id="timeseries-select"
          value={selectedTimeSeries}
          label="Select a data type to explore"
          onChange={handleChange}
        >
          {Object.values(timeSeriesCollection.timeSeries).map(
            (timeSeries, index) => (
              <MenuItem value={timeSeries.type} key={index}>
                {timeSeries.type}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
