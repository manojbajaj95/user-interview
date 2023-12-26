export const siteConfig = {
  name: "Interview",
  description:
    "An application inspired by \"The Mom's Test\" to help founders generate better user insights",
  url: "https://tx.shadcn.com",
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/senor_bajaj",
    github: "https://github.com/manojbajaj95",
  },
}

export type MainNavItem = {
  name: string,
  link: string,
  disabled: boolean
}

export const MainNav: MainNavItem[] = [
  {
    "name": "Home",
    "link": "/#",
    disabled: false
  },
  {
    "name": "About",
    "link": "/#about",
    disabled: false
  },
]