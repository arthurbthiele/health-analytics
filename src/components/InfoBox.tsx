import { Text } from "./Text";
import React, { ReactElement } from "react";

export function InfoBox(): ReactElement {
  return (
    <Text
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "30%",
        padding: 50,
        fontSize: "large",
      }}
    >
      The Apple Watch gathers a lot of useful data. However, the inbuilt data
      analysis is missing some features I want. I have made this site in an
      attempt to create some of those features. These include:
      <ul>
        <li>
          Basic statistical summaries, like averages and standard deviations.{" "}
        </li>
        <li>
          Splitting input data on a supplied date, and testing to see if there
          has been a significant change in the timeseries before vs. after the
          supplied date. If so, I want to see the nature of that change.{" "}
        </li>
        <li>Clearer graphical visualisations.</li>
      </ul>
      If you have an Apple Watch and want to use this site, first{" "}
      <a href="https://www.computerworld.com/article/2889310/how-to-export-apple-health-data-as-a-document-to-share.html?page=2">
        export
      </a>{" "}
      your data. Then, use the button at the top left to upload the main .xml
      file in the generated .zip. Depending on the file size, this may take some
      time (~10s for my 100MB file). You can then browse through your data.{" "}
      <br />
      If you want to test the features without uploading data, click the
      Generate Random Data button. This generates reasonably realistic data for
      the last 201 days, on which data analysis can be done. The program will
      automatically search for a significant date in this time period (e.g.
      started a new medication, started a gym program, etc).
      <br />
      This is an open source project. The code is stored{" "}
      <a href="https://github.com/arthurbthiele/health-monitor">here</a>. Please
      suggest changes as Github issues there, or send me an email at: <br />
      arthurbthiele (at) gmail.com
      <br />
      All calculations are performed entirely in browser, and no information is
      collected or stored about any user anywhere but their browser. No
      information is retained after a user ends their session. <br />
      This site is intended mainly to satisfy curiosity - if you are in need of
      health advice, please consult a medical professional.
    </Text>
  );
}
