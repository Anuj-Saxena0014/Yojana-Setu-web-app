import {
  getAllSchemes,
  getSchemeById
} from "../services/schemeService";

export const getAllSchemes = () => schemes;

export const getSchemeById = (id) =>
  schemes.find((scheme) => scheme.id === id);