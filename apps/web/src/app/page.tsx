import React from 'react'
import {Button} from "@repo/ui/button"
import { Card } from '@repo/ui/card'

const page = ():JSX.Element => {
  return (
    <div className=' flex flex-col justify-center items-center'>
      <Button>Click me</Button>
      <Card  href="https://example.com" title="Card title">
        Card content
      </Card>
      <div>
        <h1>Hello, Turbo!</h1>
      </div>
    </div>
  )
}

export default page
