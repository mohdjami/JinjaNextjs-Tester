export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

export const pageview = (url: string) => {
  // @ts-ignore
  window.dataLayer.push({
    event: "pageview",
    page: url,
  })
}
