(this["webpackJsonphealth-monitor"]=this["webpackJsonphealth-monitor"]||[]).push([[0],{193:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),i=r(66),o=r.n(i),c=(r(77),r(2)),s=function(e){var t=e.children;return Object(c.jsx)("div",{style:{width:window.innerWidth,height:window.innerHeight,display:"flex",alignItems:"center",justifyContent:"center"},children:Object(c.jsx)("div",{style:{padding:24,width:"100%",height:"100%",position:"absolute",left:0,top:0},children:t})})},l=r(18),u=r(5),d=r(72),f="verdana",b={primary:{small:{fontSize:14,fontFamily:f},medium:{},large:{},display:{fontSize:20,fontFamily:f,color:"#d63e13"}},secondary:{footer:{fontSize:12,fontFamily:f,color:"#333333"},small:{},medium:{},large:{},display:{}}},j=function(e){var t=e.style,r=e.children;return Object(c.jsx)("div",{style:Object(u.a)(Object(u.a)({},b.primary.small),t),children:r})},p=r(43),h=r.n(p),v=r(44),m=r.n(v),O=r(1);var g=function(e){var t={attributeNamePrefix:"",attrNodeName:"attr",textNodeName:"#text",ignoreAttributes:!1,ignoreNameSpace:!1,allowBooleanAttributes:!1,parseNodeValue:!0,parseAttributeValue:!1,trimValues:!0,cdataTagName:"__cdata",cdataPositionChar:"\\c",parseTrueNumberOnly:!1,numParseOptions:{hex:!0,leadingZeros:!0},arrayMode:!1,attrValueProcessor:function(e){return h.a.decode(e,{isAttributeValue:!0})},tagValueProcessor:function(e){return h.a.decode(e)},stopNodes:["parse-me-as-string"]};if(!0===m.a.validate(e)){var r=m.a.parse(e,t);if(function(e){if(!e.HealthData)return!1;if(!e.HealthData.Record)return!1;var t,r=Object(O.a)(e.HealthData.Record);try{for(r.s();!(t=r.n()).done;){var a=t.value;if(!a.attr)return!1;if(!a.attr.type)return!1}}catch(n){r.e(n)}finally{r.f()}return!0}(r))return r}};function y(e){var t=function(e){return Object(a.useCallback)((function(t){t.forEach((function(t){var r=new FileReader;r.onabort=function(){return console.log("file reading was aborted")},r.onerror=function(){return console.log("file reading has failed")},r.onload=function(){return setTimeout((function(){var t=r.result,a=g(t);void 0!==a?e(a):alert("Uploaded file does not have expected properties")}),1)},r.readAsText(t)}))}),[])}(e.onUpload),r=Object(d.a)({onDrop:t}),n=r.getRootProps,i=r.getInputProps;return Object(c.jsxs)("div",Object(u.a)(Object(u.a)({},n()),{},{children:[Object(c.jsx)("input",Object(u.a)({},i())),Object(c.jsx)(j,{children:"Click here to upload an XML file"})]}))}var x=r(68),S=r.n(x);function w(e){var t={timeSeries:{}};return e.HealthData.Record.filter((function(e){return void 0!==e.attr.value&&void 0!==e.attr.startDate})).forEach((function(e){var r=function(e){var t=S()(e.attr.startDate),r=parseInt(e.attr.value);return{t:t,y:r}}(e),a=e.attr.type;a in t.timeSeries?t.timeSeries[a].dataSet.push(r):t.timeSeries[a]={type:a,dataSet:[r]}})),t}var N=r(71);function D(e){var t=e.timeSeries;if(void 0===t)return Object(c.jsx)("div",{});var r={labels:t.dataSet.map((function(e){return e.t})),datasets:[{label:t.type,backgroundColor:"rgba(75,192,192,1)",borderColor:"rgba(0,0,0,1)",borderWidth:2,data:t.dataSet.map((function(e){return e.y}))}]};return Object(c.jsx)(N.a,{data:r,options:{title:{display:!0,text:"Average Resting Heart Rate"},legend:{display:!0,position:"right"}}})}function P(){return Object(c.jsx)("div",{})}function R(){var e=Object(a.useState)(),t=Object(l.a)(e,2),r=t[0],n=t[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)(y,{onUpload:function(e){n(w(e))}}),Object(c.jsx)(P,{}),r?Object.values(r.timeSeries).map((function(e,t){return Object(c.jsx)(D,{timeSeries:e},t)})):null]})}var A=function(){return Object(c.jsx)(s,{children:Object(c.jsx)(R,{})})};o.a.render(Object(c.jsx)(n.a.StrictMode,{children:Object(c.jsx)(A,{})}),document.getElementById("root"))},77:function(e,t,r){}},[[193,1,2]]]);
//# sourceMappingURL=main.2d4f0d57.chunk.js.map