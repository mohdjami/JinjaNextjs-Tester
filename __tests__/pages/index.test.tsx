import { act, render } from "@testing-library/react"
import fetch from "jest-fetch-mock"
import React from "react"
import Home from "../../pages/index"

beforeEach(() => {
  fetch.resetMocks()
})

describe("Home", () => {
  it("success to render", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        python_version: {
          major: "3",
          minor: "6",
          patch: "0",
        },
        jinja_version: {
          major: "2",
          minor: "11",
          patch: "0",
        },
      })
    )

    await act(async () => {
      expect(() => render(<Home />)).not.toThrow()
    })
  })
})
