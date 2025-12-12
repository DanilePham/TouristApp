const buildCategoryTree = (categories, parentId = "") => {
  if (!Array.isArray(categories)) return [];

  const tree = [];
  for (const item of categories) {
    // normalize parent values to string for reliable comparison
    const itemParent = item.parent === null || item.parent === undefined ? "" : String(item.parent);
    const compareParentId = parentId === null || parentId === undefined ? "" : String(parentId);

    if (itemParent === compareParentId) {
      const children = buildCategoryTree(categories, item._id);

      tree.push({
        _id: item._id,        // ensure _id exists for views/mixins expecting it
        id: item._id,         // keep id for any code that expects 'id'
        name: item.name,
        children: children
      });
    }
  }
  return tree;
};

module.exports.buildCategoryTree = buildCategoryTree;