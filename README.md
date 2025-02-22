# statistic-models

A collection of statistical models implemented in TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.0.36-blue)](https://www.npmjs.com/package/statistic-models)

## Overview

`statistic-models` is a TypeScript library that provides implementations of various statistical models located in the `src/models` directory, including:

*   **doubleExponentialSmoothingAdditive**: Implements the double exponential smoothing method with an additive trend. It takes time series data and smoothing parameters (alpha and beta) to forecast future values.
*   **doubleExponentialSmoothingMultiplicative**: Implements the double exponential smoothing method with a multiplicative trend. It takes time series data and smoothing parameters (alpha and beta) to forecast future values. This version is improved.
*   **exponentialMovingAverageForecast**: Forecasts future values using the exponential moving average method. It takes time series data, a smoothing factor, and a forecast horizon as input.
*   **exponentialSmoothingForecast**: Forecasts future values using the exponential smoothing method. It takes time series data, a forecast horizon, and a smoothing level as input.
*   **exponentialSmoothing**: Smoothes time series data using the exponential smoothing method. It takes time series data and a smoothing parameter (alpha) as input.
*   **linearRegressionForecast**: Forecasts future values using linear regression. It takes time series data, a forecast horizon, and a lag value as input.
*   **movingAverageForecast**: Forecasts future values using the moving average method. It takes time series data, a window size, and a forecast horizon as input.
*   **movingAverage**: Calculates the moving average of time series data. It takes time series data and a window size as input.
*   **StateSpaceModel**: Implements a state-space model. It takes matrices A, B, C, D, and an initial state as input. It can predict the next state and the observed value. It also has a placeholder method for updating the state.
*   **TripleExponentialSmoothing**: Implements the triple exponential smoothing method. It takes smoothing parameters (alpha, beta, and gamma) and a period as input. It can forecast future values and update the model with new data.
*   **VectorAutoregression**: Implements a vector autoregression (VAR) model. It takes the number of lags and the number of variables as input. It can prepare data, fit the model, and predict future values.

This library is designed to be modular, easy to use, and well-tested.

## Installation

```bash
npm install statistic-models
```


License
MIT License

Copyright (c) 2024 Kyosuke Kobayashi
