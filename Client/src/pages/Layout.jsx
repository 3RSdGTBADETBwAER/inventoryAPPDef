import React from 'react'
import { Outlet, Link } from "react-router-dom"
export default function layout() {
  return (
    <>
        <div>
            <Link to ="/">Musicstore</Link>
        </div>
        <Outlet></Outlet>
    </>
  )
}
