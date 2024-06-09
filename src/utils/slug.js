const generateSlug = (name) => {
    const lowerCaseName = name.toLowerCase();
    const nameWithHyphens = lowerCaseName.replace(/[^a-z0-9]+/g, '-');
    const cleanedSlug = nameWithHyphens.replace(/(^-|-$)+/g, '');
    return cleanedSlug;
};

module.exports = { generateSlug };
