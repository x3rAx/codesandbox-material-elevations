export default (px) =>
  px.replace("0px", "0").replace(/(-{0,1}\d+)px/g, "calc($1rem/16)");
