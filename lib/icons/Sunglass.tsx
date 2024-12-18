import * as React from 'react'
import type { SVGProps } from 'react'

const SvgSunglass = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 46"
    {...props}
  >
    <path
      fill="#A9A9A9"
      fillRule="evenodd"
      d="M.677 4.683A4.09 4.09 0 0 1 4.768.59h20.459a4.09 4.09 0 0 1 4.091 4.092v3.805a10.23 10.23 0 0 1-4.556 8.51l-6.076 4.051 6.076 4.051a10.23 10.23 0 0 1 4.556 8.51v3.806a4.09 4.09 0 0 1-4.091 4.092H4.768a4.09 4.09 0 0 1-4.091-4.092v-3.805A10.23 10.23 0 0 1 5.23 25.1l6.08-4.052L5.235 17a10.23 10.23 0 0 1-4.558-8.51zm14.32 13.907 7.497-4.998a6.14 6.14 0 0 0 2.733-5.104V4.683H4.768v3.805a6.14 6.14 0 0 0 2.734 5.104zm0 4.919-7.495 4.997a6.14 6.14 0 0 0-2.734 5.105v3.805h20.459v-3.805a6.14 6.14 0 0 0-2.733-5.104z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgSunglass
