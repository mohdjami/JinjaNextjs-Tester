import Link from "next/link"
import type React from "react"
import { useMemo } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { SemVer } from "../lib/version"

type Props = {
  pythonVersion: SemVer | undefined
  jinjaVersion: SemVer | undefined
}

const NavBar: React.FC<Props> = ({ pythonVersion, jinjaVersion }) => {
  const python = useMemo(() => {
    if (pythonVersion) {
      return (
        <Link
          href={`https://docs.python.org/${pythonVersion.major}.${pythonVersion.minor}/`}
          passHref={true}
        >
          <a
            className="dropdown-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            Python version: {pythonVersion.major}.{pythonVersion.minor}.
            {pythonVersion.patch}
          </a>
        </Link>
      )
    } else {
      return <NavDropdown.Item>Python version: -</NavDropdown.Item>
    }
  }, [pythonVersion])

  const jinja2 = useMemo(() => {
    if (jinjaVersion) {
      return (
        <Link
          href={`https://jinja.palletsprojects.com/en/${jinjaVersion.major}.${jinjaVersion.minor}.x/`}
          passHref={true}
        >
          <a
            className="dropdown-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jinja2 version: {jinjaVersion.major}.{jinjaVersion.minor}.
            {jinjaVersion.patch}
          </a>
        </Link>
      )
    } else {
      return <NavDropdown.Item>Jinja2 version: -</NavDropdown.Item>
    }
  }, [jinjaVersion])

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Link href="/">
          <a className="navbar-brand">
            {/*  If use the Image component from next/image, Bootstrap CSS is not able to interpret the image brand. */}
            {/* eslint @next/next/no-img-element: 0 */}
            <img src="/file1.png" alt="file2" width="30" height="30" />
            JAMI{" "}
          </a>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Information" id="collasible-nav-dropdown">
              {python}
              {jinja2}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
