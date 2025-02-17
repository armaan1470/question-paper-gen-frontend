"use client";

import { SchoolIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  CardFooter,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Utility for API call
const loginRequest = async (username: string, password: string) => {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return response.json(); // assuming backend sends token or user info
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error on every login attempt

    try {
      const response = await loginRequest(username, password);
      console.log("Login successful:", response);

      // Store token in localStorage or cookies (depending on your needs)
      localStorage.setItem("authToken", response.token);

      // Redirect user to the dashboard or homepage
      router.push("/"); // or use Next.js routing
    } catch (err) {
      console.error("Login failed:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="flex flex-col gap-1 items-center justify-center pt-10 pb-6">
          <div className="rounded-full bg-primary-100 p-3">
            <SchoolIcon />
          </div>
          <h1 className="text-3xl font-bold mt-4">Welcome back!</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your account
          </p>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardBody className="gap-6 px-8 pb-10">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Input
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isRequired
              size="lg"
              className="text-lg"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              size="lg"
              className="text-lg"
            />
            <div className="flex items-center justify-between">
              <Checkbox defaultSelected size="md">
                Remember me
              </Checkbox>
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full text-lg font-semibold py-6 mt-2"
              isLoading={isLoading}
              radius="md"
            >
              Log in
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
