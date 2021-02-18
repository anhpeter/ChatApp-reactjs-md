import React from 'react'
import { Link } from 'react-router-dom'

export default function RouterLink({ children, ...rest }) {
    return (
        <Link {...rest} style={{textDecoration: 'none'}}>{children}</Link>
    )
}
