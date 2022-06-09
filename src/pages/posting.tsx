import React from "react"
import { graphql } from "gatsby"

const Posting = () => {
  const hanlderOnSubmit = () => {

  }
  return (
    <>
      <form method="post" onSubmit={hanlderOnSubmit}>
        <input type="text" name="name" placeholder="영양제 이름 입력" />
        <input type="text" name="price" placeholder="영양제 가격 입력" />
        <button type="submit" />
      </form>
    </>
  )
}

export default Posting