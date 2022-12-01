import { useRouter } from 'next/router'
import React from 'react'

const Gender = () => {

  const router = useRouter();

  return (
    <div>Gender { router.query.gender ?? '' }</div>
  )
}

export default Gender