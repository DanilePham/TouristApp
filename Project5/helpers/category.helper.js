const {CategoryModel} = require("../models/categories.model.js");

//Start helper
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
        slug: item.slug,
        children: children
      });
    }
  }
  return tree;
};

module.exports.buildCategoryTree = buildCategoryTree;
//End helper


//getCategorySub
const getCategorySubId = async (parentId = "") => {
  const listId = [];

  const children = await CategoryModel.find({
    parent: parentId,
    deleted: false,
    status: "active"
  });

  for (const i of children) {

    listId.push(i._id);

    await getCategorySubId(i._id);
  }

  return listId;
}
module.exports.getCategorySubId = getCategorySubId;
//end getCategorySub