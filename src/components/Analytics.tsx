import React, { ReactElement } from "react";
import { Timeseries } from "../utilities/processData";
import { DateTime } from "luxon";
import { getSplitTimeseriesAnalytics } from "../utilities/analyticsHelpers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function Analytics({
  timeseries,
  analyticsDate,
}: {
  timeseries: Timeseries;
  analyticsDate: DateTime;
}): ReactElement {
  const output = getSplitTimeseriesAnalytics(timeseries, analyticsDate);

  function createData(
    name: string,
    count: number,
    average: number | string,
    deviation: number | string
  ) {
    return { name, count, average, deviation };
  }

  const rows = [
    createData(
      "Analysis Prior to Selected Date",
      output.before.count,
      output.before.average || "-",
      output.before.deviation || "-"
    ),
    createData(
      "Analysis After Selected Date",
      output.after.count,
      output.after.average || "-",
      output.after.deviation || "-"
    ),
  ];
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Analysis Section</TableCell>
              <TableCell align="right">Record Count</TableCell>
              <TableCell align="right">Mean</TableCell>
              <TableCell align="right">Sample Standard Deviation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{row.average}</TableCell>
                <TableCell align="right">{row.deviation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {output.pValue !== undefined && (
        <div style={{ paddingTop: 10 }}>
          Under a{" "}
          <a href="https://en.wikipedia.org/wiki/Permutation_test">
            Permutation Test
          </a>
          , this data separation has a p-value of {output.pValue}. <br />
          This means that a difference in value of this great or greater has a{" "}
          {output.pValue} chance of occurring if the underlying populations are
          identical. In general, a lower p-value suggests that there is a
          meaningful difference between the two populations.
        </div>
      )}
    </div>
  );
}
