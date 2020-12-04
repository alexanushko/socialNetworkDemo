export const reducerHelper = (items, objPropName, itemId, newObjProps) => {
  return items.map(item => {
    return item[objPropName] === itemId ? { ...item, ...newObjProps } : item;
  });
};
