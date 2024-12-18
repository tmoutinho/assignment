import * as React from 'react'
import type { SVGProps } from 'react'

const SvgRoundedEnter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 83 82"
    {...props}
  >
    <circle
      cx={41.6}
      cy={41.089}
      r={39.894}
      fill="#fff"
      stroke="#E5E5E5"
      strokeWidth={2.046}
    />
    <path
      stroke="#707070"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.41}
      d="M32.05 41.086h19.095M41.602 31.54l9.547 9.546-9.547 9.548"
    />
  </svg>
)
export default SvgRoundedEnter
