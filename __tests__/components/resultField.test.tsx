import { render, screen } from "@testing-library/react"
import React from "react"
import ResultField from "../../components/resultField"

describe("ResultField", () => {
  it("display default text initially", () => {
    render(<ResultField />)

    expect(
      screen.getByText("Rendering result will be showed here.")
    ).toBeInTheDocument()
  })

  it("display result text", () => {
    const result = "foo\nbar"
    render(<ResultField result={result} />)

    expect(screen.getByText("foo")).toBeInTheDocument()
    expect(screen.getByText("bar")).toBeInTheDocument()
  })

  it("display an error message", () => {
    const errorMessage = "error message"
    render(<ResultField errorMessage={errorMessage} />)

    expect(screen.getByText("error message")).toBeInTheDocument()
  })
})
