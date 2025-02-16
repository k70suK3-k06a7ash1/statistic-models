/**
 * 移動平均を使用して将来を予測する
 * @param data 時系列データ (数値の配列)
 * @param windowSize 移動平均のウィンドウサイズ
 * @param forecastHorizon 予測期間 (未来の時点数)
 * @returns 予測値の配列
 */
export declare function movingAverageForecast(data: number[], windowSize: number, forecastHorizon: number): number[];
