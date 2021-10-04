import he from "he";

import parser from "fast-xml-parser";

export const parseXML = (xmlData: string): unknown => {
  interface Options {
    ignoreAttributes: boolean;
    attrValueProcessor: (val: string) => string;
    attrNodeName: string;
    trimValues: boolean;
    textNodeName: string;
    cdataTagName: string;
    attributeNamePrefix: string;
    parseAttributeValue: boolean;
    parseNodeValue: boolean;
    parseTrueNumberOnly: boolean;
    cdataPositionChar: string;
    arrayMode: boolean;
    numParseOptions: { hex: boolean; leadingZeros: boolean };
    tagValueProcessor: (val: string) => string;
    ignoreNameSpace: boolean;
    allowBooleanAttributes: boolean;
    stopNodes: string[];
  }

  const options: Options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    numParseOptions: {
      hex: true,
      leadingZeros: true,
      //skipLike: /\+[0-9]{10}/
    },
    arrayMode: false, //"strict"
    attrValueProcessor: (val) => he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"],
  };

  if (parser.validate(xmlData) === true) {
    //optional (it'll return an object in case it's not valid)
    const jsonObj = parser.parse(xmlData, options);
    return jsonObj;
  }

  // // Intermediate obj
  // const tObj = parser.getTraversalObj(xmlData, options);
  // const jsonObj = parser.convertToJson(tObj, options);
};
