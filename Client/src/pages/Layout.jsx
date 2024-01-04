import React from 'react'
import { Outlet, Link } from "react-router-dom"
export default function layout() {
  return (
    <>
        <div>
            <Link to ="/">Musicstore</Link>
        </div>
        <div>
          <Link to="/Admin">Admin</Link>
        </div>
        <Outlet></Outlet>
    </>
  )
}
