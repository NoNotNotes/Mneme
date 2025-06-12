import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a class="icon-anchor" href={baseDir}><img src="/static/icon.png" alt="icon" class="icon"/></a> { /* credit to github.com/rimaout for the pageTitle edit */ }
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 2.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: start;
}

.page-title .icon {
  margin-right: 0.5rem;
  width: 50px;
  height: 50px;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor

/* ORIGINAL

import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
}
*/

// import { pathToRoot } from "../util/path"
// import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// import { classNames } from "../util/lang"
// import { i18n } from "../i18n"

// const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
//   const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
//   const baseDir = pathToRoot(fileData.slug!)
//   return (
//     <h2 class={classNames(displayClass, "page-title")}>
//       <a href={baseDir}>{title}</a>
//     </h2>
//   )
// }

// PageTitle.css = `
// .page-title {
//   font-size: 1.75rem;
//   margin: 0;
//   font-family: var(--titleFont);
// }
// `

// export default (() => PageTitle) satisfies QuartzComponentConstructor
