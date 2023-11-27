export const numToString = (val: number, digit: number) => {
  const valStr = val.toString();

  if (valStr.length === digit) {
    return valStr;
  }

  if (valStr.length < digit) {
    return `${"0".repeat(digit - valStr.length)}${valStr}`;
  }
};

export const capatalize = (str: any) => {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};

export const cropString = (str: string, num: number) => {
  console.log(str.length);
  if (str.length > num) {
    const newstr = str.slice(0, num);
    console.log(newstr);
    const result = newstr.concat("...");
    return result;
  } else return str;
};
