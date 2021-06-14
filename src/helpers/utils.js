/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-spread */
export const generateArray = (length) =>
  Array.apply(null, new Array(length + 1)).map((_el, i) => i++);
