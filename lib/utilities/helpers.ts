export const getPageWindow = (current: number, total: number): Array<number|null> => {
  // [1,null,4,5,6,null,20]
  if(total <= 7) {
    return Array.from({length: total}, (_, i)=> i +1 )
  }
  
  const page: Array<number|null> = [1]
  const start = Math.max(2, current-1)
  const end = Math.min(total-1, current+1)

  if(start > 2) {
    page.push(null)
  }
  for(let p = start; p <= end; p++) {
    page.push(p)
  }
  if(end < total-1) {
    page.push(null)
  }
  page.push(total)
  return page
}

export const getFirstItemOfAnArray = (v?: string | string[]) => {
  return (Array.isArray(v) ? v[0] : v);
}

export const buildHref = (base_url: string, params: {search: string, page: number, limit: number}) => {
  const qs = new URLSearchParams()
  if(params.search) {
    qs.set("search", params.search)
  }
  if (params.page) {
    qs.set("page", String(params.page));
  }
  if (params.limit) {
    qs.set("limit", String(params.limit));
  }
  return `${base_url}?${qs.toString()}`
}