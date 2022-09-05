import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({note}) => {
  return (
    <Link to={`/${note["_id"]}`}>{note["body"]}</Link>
  )
}
export default ListItem;
