import { useState, useCallback } from "react";
import { FlamesResult, FlamesResultData, InputValues } from "../types/index";
import { calculateFlames, getResultData } from "../utils/flamesCalculator";

export function useFlames() {
  const [input, setInput] = useState<InputValues>({
    name1: "",
    name2: "",
  });

  const [result, setResult] = useState<FlamesResult>(null);
  const [resultData, setResultData] = useState<FlamesResultData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = useCallback(
    (name: keyof InputValues, value: string) => {
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const calculate = useCallback(() => {
    if (!input.name1.trim() || !input.name2.trim()) {
      alert("Please enter both names");
      return;
    }

    setIsCalculating(true);

    // Simulate calculation time for animation effect
    setTimeout(() => {
      const flamesResult = calculateFlames(input.name1, input.name2);
      const data = getResultData(flamesResult);

      setResult(flamesResult);
      setResultData(data);
      setIsCalculating(false);
    }, 1000);
  }, [input]);

  const reset = useCallback(() => {
    setInput({ name1: "", name2: "" });
    setResult(null);
    setResultData(null);
  }, []);

  return {
    input,
    result,
    resultData,
    isCalculating,
    handleInputChange,
    calculate,
    reset,
  };
}
