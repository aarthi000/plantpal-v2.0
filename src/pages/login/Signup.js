import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="w-full bg-[#151321] min-h-screen text-[#151321] flex flex-col gap-4 pb-12">
      <div className="flex justify-between items-center px-12 py-6">
        <img src="./plantpallogo.png" alt="leaf" className="h-8" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Sign Up</h2>
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

              <Form.Group controlId="password-confirm" className="mb-3">
                <Form.Label className="text-black">Confirm Password</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>

              <Button disabled={loading} type="submit" className="w-full" style={{ backgroundColor: '#4CAF50' }}>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-full text-center mt-4 text-white">
          Already have an account? <Link to="/login" className="text-green-300">Log In</Link>
        </div>
      </div>
    </div>
  );
}
