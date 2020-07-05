/*
 * The objective of this module is to make all active promotions accessible to other modules in an way that can be easily built upon.
 *
 * This is accomplished by automatically exporting all (default exports from) the modules in this directory
 *  via a `Promotions` object
 *
 * This decision was made to minimize configuration and the number of changes needed to add a promotion.
 */

interface HasDefaultExport {
  default;
}

import RequireDir from 'require-dir';
import { PriceOption } from 'pricing';

const Modules = RequireDir('.', { extensions: ['.ts'] });
const Promotions = extractDefaultExports<PriceOption>(Modules);

export default Promotions;

/**
 * Normalize object of
 *
 * module name -> module exports
 *
 * to an object of
 *
 * module name -> default export
 * @param modules Precondition: All modules should have default exports
 */
function extractDefaultExports<ExportType>(modules): { [moduleName: string]: ExportType } {
  const newModules = {};
  Object.entries(modules).forEach(([moduleName, mod]) => {
    Object.assign(newModules, { [moduleName]: (mod as HasDefaultExport).default });
  });
  return newModules;
}
