import AnimatedHeading from '@/components/AnimatedHeading'
import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const subscription = () => {
  return (
      <AnimatedHeading>

        <PricingTable />
      </AnimatedHeading>
  )
}

export default subscription