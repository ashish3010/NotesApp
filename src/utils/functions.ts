import parse from "html-react-parser";

export const parseHTML = (str = "") => {
  const parsed = parse(str || "");
  return parsed;
};

export const getCurrentDate = (): string => {
  const date = new Date();
  const time = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    second: "2-digit",
  });
  return time;
};
