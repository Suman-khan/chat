
import '@testing-library/react'
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import axios from "axios";
import AuthPage from "./AuthPage";
import "../jest.config"

jest.mock("axios");

describe("AuthPage", () => {
  afterEach(cleanup);

  it("should render the form", () => {
    render(<AuthPage />);
    const formTitle = screen.getByText("Welcome 👋");
    const formSubtitle = screen.getByText("Set a username to get started");
    const usernameInput = screen.getByLabelText("Username");
    const enterButton = screen.getByText("Enter");
    expect(formTitle).toBeInTheDocument();
    expect(formSubtitle).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  it("should submit the form with username and authenticate user", async () => {
    const onAuthMock = jest.fn();
    const data = { secret: "test123", token: "12345" };
    axios.post.mockResolvedValue({ data });
    render(<AuthPage onAuth={onAuthMock} />);
    const usernameInput = screen.getByLabelText("Username");
    const enterButton = screen.getByText("Enter");
    fireEvent.change(usernameInput, { target: { value: "test123" } });
    fireEvent.click(enterButton);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/authenticate",
      { username: "test123" }
    );
    await screen.findByText("Welcome 👋"); // wait for page to reload
    expect(onAuthMock).toHaveBeenCalledWith(data);
  });

  it("should show auth error on authentication failure", async () => {
    axios.post.mockRejectedValue(new Error("Authentication failed"));
    render(<AuthPage />);
    const usernameInput = screen.getByLabelText("Username");
    const enterButton = screen.getByText("Enter");
    fireEvent.change(usernameInput, { target: { value: "test123" } });
    fireEvent.click(enterButton);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3001/authenticate",
      { username: "test123" }
    );
    const errorElement = await screen.findByText("Auth Error");
    expect(errorElement).toBeInTheDocument();
  });
});
