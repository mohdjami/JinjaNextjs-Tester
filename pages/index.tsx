import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import dynamic from "next/dynamic"
import { useState } from "react"
import { Card, Container } from "react-bootstrap"
import useSWR from "swr"
import NavBar from "../components/navBar"
import ResultField from "../components/resultField"

const InputField = dynamic(() => import("../components/inputField"), {
  ssr: false,
})

const Home: NextPage = ({}) => {
  const { pythonVersion, jinjaVersion } = useVersion()

  const [rendered, setRendered] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (template: string, context: string) => {
    const res = await fetch("/api/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template,
        context,
      }),
    })

    if (res.status !== 200) {
      console.error(res)

      try {
        const errorBody = await res.json()
        setRendered("")
        setErrorMessage(`[${errorBody.type}] ${errorBody.message}`)
      } catch {
        setRendered("")
        setErrorMessage("Unknown error was occured. See the developer console.")
      }

      return
    }

    const body = await res.json()
    setRendered(body.rendered)
    setErrorMessage("")
  }

  return (
    <div>
      <main id="main">
        <NavBar pythonVersion={pythonVersion} jinjaVersion={jinjaVersion} />
        <Container>
          <div id="top-message">
            <Card>
              <Card.Body>
                <Card.Title>What&rsquo;s Jinjester?</Card.Title>
                Jinjester is the testing tool for Jinja2. You can test or use
                Jinja2 by trial with Jinjester.
              </Card.Body>
            </Card>
          </div>
          <InputField onSubmit={onSubmit} />
          <ResultField result={rendered} errorMessage={errorMessage} />
        </Container>
      </main>
    </div>
  )
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const useVersion = () => {
  const { data, error } = useSWR("/api/version", fetcher)

  if (error) {
    console.error(error)
  }

  return {
    pythonVersion: data?.python_version,
    jinjaVersion: data?.jinja_version,
    // isLoading: !error && !data,
    // isError: error,
  }
}

export default Home
