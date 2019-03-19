/* eslint import/export: 0 */

// Stylesheet Modules
interface ClassNames {
  [className: string]: string;
}

declare module '*.css' {
  const classNames: ClassNames;
  export default classNames;
}

declare module '*.mcss' {
  const classNames: ClassNames;
  export default classNames;
}
