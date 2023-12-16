import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import NavBar from "../../components/navBar"

describe("NavBar", () => {
  it("display versions", () => {
    const pythonVersion = {
      major: "3",
      minor: "6",
      patch: "0",
    }
    const jinjaVersion = {
      major: "2",
      minor: "11",
      patch: "0",
    }
    render(<NavBar pythonVersion={pythonVersion} jinjaVersion={jinjaVersion} />)

    userEvent.click(screen.getByText("Information"))

    expect(
      screen.getByRole("link", { name: "Python version: 3.6.0" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "Jinja2 version: 2.11.0" })
    ).toBeInTheDocument()
  })

  it("display empty version if versions are not passed", () => {
    const pythonVersion = undefined
    const jinjaVersion = undefined
    render(<NavBar pythonVersion={pythonVersion} jinjaVersion={jinjaVersion} />)

    userEvent.click(screen.getByText("Information"))

    expect(screen.getByText("Python version: -")).toBeInTheDocument()
    expect(screen.getByText("Jinja2 version: -")).toBeInTheDocument()
  })
})
