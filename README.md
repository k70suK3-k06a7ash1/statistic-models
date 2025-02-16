# statistic-models

A collection of statistical models implemented in TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.0.7-blue)](https://www.npmjs.com/package/statistic-models)

## Overview

`statistic-models` is a TypeScript library that provides implementations of various statistical models, including exponential smoothing, moving average, and state-space models. This library is designed to be modular, easy to use, and well-tested.

## Installation

```bash
npm install statistic-models
```

## Usage
```typescript
import { doubleExponentialSmoothingAdditive } from 'statistic-models';

const data = [10, 12, 14, 16, 18, 20];
const alpha = 0.8;
const beta = 0.2;

const forecast = doubleExponentialSmoothingAdditive(data, alpha, beta, 3); // Forecast 3 steps into the future

console.log(forecast);
```


## 1. Double Exponential Smoothing (Additive)
The double exponential smoothing (additive) model is used for forecasting time series data with trend.

- Function:     
    - doubleExponentialSmoothingAdditive(data: number[], alpha: number, beta: number, steps: number): number[]
- Parameters:
    - data: The time series data.
    - alpha: The smoothing factor for the level (0 < alpha < 1).
    - beta: The smoothing factor for the trend (0 < beta < 1).
    - steps: The number of steps to forecast into the future.
- Returns: An array of forecasted values.



```typescript
import { doubleExponentialSmoothingAdditive } from 'statistic-models';

const data = [10, 12, 14, 16, 18, 20];
const alpha = 0.8;
const beta = 0.2;

const forecast = doubleExponentialSmoothingAdditive(data, alpha, beta, 3); // Forecast 3 steps into the future

console.log(forecast);
```


## 2. Double Exponential Smoothing (Multiplicative)
The double exponential smoothing (multiplicative) model is used for forecasting time series data with trend and multiplicative seasonality.

- Function:     
    - doubleExponentialSmoothingMultiplicative(data: number[], alpha: number, beta: number, steps: number): number[]

- Parameters:
    - data: The time series data.
    - alpha: The smoothing factor for the level (0 < alpha < 1).
    - beta: The smoothing factor for the trend (0 < beta < 1).
    - steps: The number of steps to forecast into the future.
- Returns: An array of forecasted values.

```typescript
import { doubleExponentialSmoothingMultiplicative } from 'statistic-models';

const data = [10, 12, 14, 16, 18, 20];
const alpha = 0.8;
const beta = 0.2;

const forecast = doubleExponentialSmoothingMultiplicative(data, alpha, beta, 3);

console.log(forecast);
```

## 3. Exponential Smoothing
The exponential smoothing model is used for forecasting time series data without trend or seasonality.

- Function: 
    - exponentialSmoothing(data: number[], alpha: number, steps: number): number[]

- Parameters:
    - data: The time series data.
    - alpha: The smoothing factor (0 < alpha < 1).
    - steps: The number of steps to forecast into the future.
- Returns: An array of forecasted values.


```typescript
import { exponentialSmoothing } from 'statistic-models';

const data = [10, 12, 14, 16, 18, 20];
const alpha = 0.8;

const forecast = exponentialSmoothing(data, alpha, 3);

console.log(forecast);
```


## 4. Moving Average
The moving average model is used for smoothing time series data and identifying trends.

- Function: 
    - movingAverage(data: number[], windowSize: number): number[]

- Parameters:
    - data: The time series data.
    - windowSize: The size of the moving average window.
- Returns: An array of smoothed values.


```typescript

import { movingAverage } from 'statistic-models';

const data = [10, 12, 14, 16, 18, 20];
const windowSize = 3;

const smoothedData = movingAverage(data, windowSize);

console.log(smoothedData);
```


## 5. State Space Model
The state-space model provides a flexible framework for analyzing time series data by representing the system's state over time.

- Function: 
    - stateSpaceModel(data: number[], initialState: number[], transitionMatrix: number[][], observationMatrix: number[][], processNoiseCovariance: number[][], observationNoiseCovariance: number[][], steps: number): number[]

- Parameters:
    - data: The time series data.
    - initialState: The initial state of the system.
    - transitionMatrix: The state transition matrix.
    - observationMatrix: The observation matrix.
    - processNoiseCovariance: The covariance matrix of the process noise.
    - observationNoiseCovariance: The covariance matrix of the observation noise.
    - steps: The number of steps to forecast into the future.
- Returns: An array of forecasted values.


```typescript
import { stateSpaceModel } from 'statistic-models';

const data = [10, 12, 14, 16, 18, 20];
const initialState = [10, 2];
const transitionMatrix = [[1, 1], [0, 1]];
const observationMatrix = [[1, 0]];
const processNoiseCovariance = [[0.1, 0], [0, 0.1]];
const observationNoiseCovariance = [[1]];
const steps = 3;

const forecast = stateSpaceModel(data, initialState, transitionMatrix, observationMatrix, processNoiseCovariance, observationNoiseCovariance, steps);

console.log(forecast);
```



## 6. Triple Exponential Smoothing
The triple exponential smoothing model is used for forecasting time series data with trend and seasonality.

- Function: 
    - tripleExponentialSmoothing(data: number[], alpha: number, beta: number, gamma: number, period: number, steps: number): number[]
- Parameters:
    - data: The time series data.
    - alpha: The smoothing factor for the level (0 < alpha < 1).
    - beta: The smoothing factor for the trend (0 < beta < 1).
    - gamma: The smoothing factor for the seasonality (0 < gamma < 1).
    - period: The length of the seasonality period.
    - steps: The number of steps to forecast into the future.
- Returns: An array of forecasted values.


```typescript
import { tripleExponentialSmoothing } from 'statistic-models';

const data = [10, 12, 14, 16, 18, 20, 11, 13, 15, 17, 19, 21];
const alpha = 0.8;
const beta = 0.2;
const gamma = 0.3;
const period = 6;
const steps = 3;

const forecast = tripleExponentialSmoothing(data, alpha, beta, gamma, period, steps);

console.log(forecast);
```


## 7. Vector Autoregression
The vector autoregression (VAR) model is used for forecasting multiple time series variables that influence each other.

- Function: 
    - vectorAutoregression(data: number[][], lag: number, steps: number): number[][]
- Parameters:

    - data: The multivariate time series data (each row is a time point, each column is a variable).
    - lag: The number of lag periods to include in the model.
    - steps: The number of steps to forecast into the future.
- Returns: An array of forecasted values for each variable.

```typescript
import { vectorAutoregression } from 'statistic-models';

const data = [[10, 20], [12, 22], [14, 24], [16, 26], [18, 28]];
const lag = 1;
const steps = 3;

const forecast = vectorAutoregression(data, lag, steps);

console.log(forecast);
```


License
MIT License

Copyright (c) 2024 Kyosuke Kobayashi