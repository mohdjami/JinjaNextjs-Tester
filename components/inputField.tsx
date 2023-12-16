import type React from "react"
import { useCallback, useMemo, useState } from "react"
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { Controlled as CodeMirror } from "react-codemirror2"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/jinja2/jinja2"
import "codemirror/mode/python/python"

const templateOptions = {
  mode: "jinja2",
  lineNumbers: true,
  lineWrapping: true,
}

const contextOptions = {
  mode: "python",
  lineNumbers: true,
  lineWrapping: true,
}

const defaultTemplate =
  "{% if isFirst %}Nice to meet you.{% else %}Hello.{% endif %}"
const defaultContext = "{\n  'isFirst': True,\n  'list_a': ['b', 'c'],\n}"

type Props = {
  onSubmit: (template: string, context: string) => Promise<void>
  errorType?: string
}

const InputField: React.FC<Props> = ({ onSubmit, errorType }) => {
  const initialTemplate = localStorage.getItem("template") || defaultTemplate
  const initialContext = localStorage.getItem("context") || defaultContext

  const [template, setTemplate] = useState(initialTemplate)
  const [context, setContext] = useState(initialContext)
  const [inSubmit, setInSubmit] = useState(false)

  const handleTemplateInput = useCallback((_: any, __: any, value: string) => {
    setTemplate(value)
    localStorage.setItem("template", value)
  }, [])

  const handleContextInput = useCallback((_: any, __: any, value: string) => {
    setContext(value)
    localStorage.setItem("context", value)
  }, [])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInSubmit(true)
    await onSubmit(template, context)
    setInSubmit(false)
  }

  const isInvalidTemplateClass = useMemo(
    () => (errorType === "template" ? "is-invalid" : ""),
    [errorType]
  )
  const isInvalidContextClass = useMemo(
    () => (errorType === "context" ? "is-invalid" : ""),
    [errorType]
  )

  return (
    <div className="input-field-container">
      <Form autoComplete="on" onSubmit={submit}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <h3>Template Statement</h3>
              <CodeMirror
                className={`statement-editor ${isInvalidTemplateClass}`}
                options={templateOptions}
                value={template}
                onBeforeChange={handleTemplateInput}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>Set your context object used for rendering.</Tooltip>
                }
              >
                <h3 className="context-settings-title">Context Settings</h3>
              </OverlayTrigger>
              <Card className="card context-container">
                <Card.Body>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Input Python dict object</Tooltip>}
                  >
                    <h5 className="context-title">Context object</h5>
                  </OverlayTrigger>
                  <CodeMirror
                    className={`context-editor ${isInvalidContextClass}`}
                    options={contextOptions}
                    value={context}
                    onBeforeChange={handleContextInput}
                  />
                </Card.Body>
              </Card>
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center submit">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!template || inSubmit}
          >
            Get Result
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default InputField
