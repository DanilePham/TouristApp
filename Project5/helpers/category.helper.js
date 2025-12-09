const buildCategoryTree = (categories, parentId = "") => {
    const tree = [];
    for (const item of categories) {
        if (item.parent == parentId) {
            const children=buildCategoryTree(categories, item._id);

            tree.push({
                id: item._id,
                name: item.name,
                children: children
            });
        }
    }
    return tree;
}

module.exports.buildCategoryTree = buildCategoryTree;