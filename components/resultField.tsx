import type React from "react"
import { useCallback, useMemo } from "react"
import { Alert, Card } from "react-bootstrap"

type Props = {
  result?: string
  errorMessage?: string
}

const ResultField: React.FC<Props> = ({ result, errorMessage }) => {
  const nl2br = useCallback((text: string): React.ReactElement[] => {
    const regexp = /(\n)/g

    return text.split(regexp).map((line, index) => {
      if (line.match(regexp)) {
        return <br key={index} />
      } else {
        return <span key={index}>{line}</span>
      }
    })
  }, [])

  const content = useMemo(() => {
    if (errorMessage) {
      return <Alert variant="danger">{nl2br(errorMessage)}</Alert>
    }
    if (result) {
      return (
        <Card>
          <Card.Body>
            <div className="lead">{nl2br(result)}</div>
          </Card.Body>
        </Card>
      )
    }

    return (
      <Alert variant="secondary">Rendering result will be showed here.</Alert>
    )
  }, [result, errorMessage, nl2br])

  return (
    <div className="result-field-container">
      <h3>Rendering Result</h3>
      <div className="result-field-content">{content}</div>
    </div>
  )
}

export default ResultField
