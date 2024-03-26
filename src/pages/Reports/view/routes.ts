import { ROUTES_GLOBAL } from "@/routes";

const BASE = ROUTES_GLOBAL.REPORTS;

export const ROUTES_REPORTS = {
  SUMMARY: "/",
  DETAILS: "/details",
};

export const ABSOLUTE_ROUTES_REPORTS = {
  SUMMARY: `${BASE}`,
  DETAILS: `${BASE}${ROUTES_REPORTS.DETAILS}`,
};
