import React, { useRef, useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="w-full bg-[#151321] min-h-screen text-[#151321] flex flex-col gap-4 pb-12">
      <div className="flex justify-between items-center px-12 py-6">
        <img src="./plantpallogo.png" alt="leaf" className="h-8" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-8">
      <div className="bg-gradient-to-r from-teal-200 to-lime-200 inline-block text-transparent bg-clip-text text-center mb-4 font-bold text-6xl pt-12 pb-4">Log In</div>

        {error && <Alert variant="danger">{error}</Alert>}
        
        <Card className="w-full max-w-xs">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="text-black">Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label className="text-black">Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button disabled={loading} type="submit" className="w-full" style={{ backgroundColor: '#4CAF50' }}>
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-full text-center mt-4 text-white">
          Need an account? <Link to="/signup" className="text-green-300">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
