import React from "react";
import { render, fireEvent, waitFor  } from "@testing-library/react";
import WeatherForecast from "./WeatherForecast";

describe("WeatherForecast component", () => {
  it("Should render correctly", () => {
    const { asFragment } = render(<WeatherForecast />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should render current weather information after submit", async () => {
    const { getByPlaceholderText, getByText } = render(<WeatherForecast />);
    const cityInput = getByPlaceholderText("Enter city");
    fireEvent.change(cityInput, { target: { value: "london" } });
    const submitButton = getByText("Search");
    fireEvent.click(submitButton);

    await waitFor (() => {
      const currentWeather = getByText("Current weather");
      expect(currentWeather).toBeInTheDocument();
    });
  });

  it("Should show error if city not found", async () => {
    const { getByPlaceholderText, getByText } = render(<WeatherForecast />);
    const cityInput = getByPlaceholderText("Enter city");
    fireEvent.change(cityInput, { target: { value: "londonsss" } });
    const submitButton = getByText("Search");
    fireEvent.click(submitButton);

    await waitFor (() => {
      const error = getByText("City not found");
      expect(error).toBeInTheDocument();
    });
  });

  it("Should show 5 day weather forecast", async () => {
    const { getByPlaceholderText, getByText } = render(<WeatherForecast />);
    const cityInput = getByPlaceholderText("Enter city");
    fireEvent.change(cityInput, { target: { value: "london" } });
    const submitButton = getByText("Search");
    fireEvent.click(submitButton);

    await waitFor (() => {
      const fiveDayForecast = getByText("5 Day's Weather Forecast");
      expect(fiveDayForecast).toBeInTheDocument();
    });
  });
});
