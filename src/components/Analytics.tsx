import React, { ReactElement, useEffect } from "react";
import { Timeseries } from "../utilities/processData";
import { DateTime } from "luxon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getSplitTimeseriesAnalytics,
  SplitAnalytics,
} from "../utilities/analytics/getSplitTimeseriesAnalytics";

export function Analytics({
  timeseries,
  setAnalyticsDate,
  analytics,
  setAnalytics,
}: {
  timeseries: Timeseries;
  setAnalyticsDate: React.Dispatch<React.SetStateAction<DateTime | null>>;
  analytics: SplitAnalytics | undefined;
  setAnalytics: React.Dispatch<
    React.SetStateAction<SplitAnalytics | undefined>
  >;
}): ReactElement {
  useEffect(() => {
    setTimeout(() => {
      setAnalytics(getSplitTimeseriesAnalytics(timeseries, setAnalyticsDate));
    }, 1);
  }, [timeseries]);

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
      analytics?.before.count || 0,
      analytics?.before.average || "-",
      analytics?.before.deviation || "-"
    ),
    createData(
      "Analysis After Selected Date",
      analytics?.after.count || 0,
      analytics?.after.average || "-",
      analytics?.after.deviation || "-"
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
      {analytics?.pValue !== undefined && (
        <div style={{ paddingTop: 10 }}>
          Under a{" "}
          <a href="https://en.wikipedia.org/wiki/Permutation_test">
            Permutation Test
          </a>
          , this data separation has a p-value of {analytics?.pValue}. <br />
          This means that a difference in value of this great or greater has a{" "}
          {analytics?.pValue} chance of occurring if the underlying populations
          are identical. In general, a lower p-value suggests that there is a
          meaningful difference between the two populations.
        </div>
      )}
    </div>
  );
}
