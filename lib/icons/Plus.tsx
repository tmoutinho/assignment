import * as React from 'react'
import type { SVGProps } from 'react'

const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 49 49"
    {...props}
  >
    <path
      fill="#212222"
      d="M26.541 12.25a2.042 2.042 0 0 0-4.083 0v10.208H12.25a2.042 2.042 0 1 0 0 4.084h10.208V36.75a2.042 2.042 0 1 0 4.083 0V26.542H36.75a2.042 2.042 0 0 0 0-4.084H26.54z"
    />
  </svg>
)
export default SvgPlus
