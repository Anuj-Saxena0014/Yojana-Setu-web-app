import schemes from "../data/schemes";

export const getAllSchemes = () => schemes;

export const getSchemeById = (id) =>
  schemes.find((scheme) => scheme.id === id);