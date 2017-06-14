
export const formatTemplate = (template, dict) => {
  if (!template) {
    return ["invalid template"];
  }
  const pattern = /(\{[^}]+\})/g;
  let result = template.split(pattern);
  for (let i = 0; i < result.length; i += 1) {
    if (result[i].match(pattern) && result[i].slice(1, -1) in dict) {
      result[i] = dict[result[i].slice(1, -1)];
    }
  }
  result = result.filter(part => part !== '');
  return result;
};

// Enumerates a list of items using the correct language syntax
export const formatList = (items, noneValue = []) => {
  switch (items.length) {
    case 0:
      return noneValue;
    case 1:
      return items;
    case 2:
      return formatTemplate(`${items[0]} and ${items[1]}`);
    case 3:
      return formatTemplate(`${items[0]}, ${items[1]}, and ${items[2]}`);
    default:
      return formatTemplate(`${items.shift()}, ${formatList(items)}`);
  }
};