export const checkDuplicates = (schemes) => {
  const seen = new Set();
  const duplicates = [];

  schemes.forEach((scheme) => {
    const name = scheme.name.toLowerCase().trim();

    if (seen.has(name)) {
      duplicates.push(scheme.name);
    } else {
      seen.add(name);
    }
  });

  return duplicates;
};