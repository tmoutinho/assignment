import * as React from 'react'
import type { SVGProps } from 'react'

const SvgRoundedPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <path
      stroke="#AEAEAE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.069}
      d="M24.92 16.908v16.367m8.183-8.184H16.736m28.642 0c0-11.299-9.16-20.458-20.459-20.458S4.461 13.792 4.461 25.09c0 11.3 9.16 20.459 20.458 20.459 11.3 0 20.459-9.16 20.459-20.459"
    />
  </svg>
)
export default SvgRoundedPlus
