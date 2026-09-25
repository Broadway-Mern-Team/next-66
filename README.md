# Server Run 
- `pnpm dev`
- Browse: `http://localhost:3000/`

## Without `src` directory 
- `/app/`

## With `src` direcotry 
- `/src/app/`


## Nextjs Routing 
- `/app/[folder]` with `page.tsx` as your route file
- `layout.tsx` and `page.tsx`


## Rendering 
- Every files is by default a server side component -> Build and render from server 
- Any component having `'use client';` this on top, is a client side component
- Only Server side component can be `async`
- Only `client side component` can have `hooks` inside the component
- Only Server side component can have meta properties


# CSS box Shadow: 
- `shadow-[0_-8px_30px_#f0f7fe]`
- `shadow-[horizon-offset_vertical-offset_blur_spread-color]`