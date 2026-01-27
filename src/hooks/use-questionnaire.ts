"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  QUESTIONNAIRE_DATA,
  getTotalQuestions,
  type Question,
} from "@/lib/questionnaire-data";

// LocalStorage key
const STORAGE_KEY = "questionnaire_answers";
const QUESTION_INDEX_KEY = "questionnaire_question_index";

export interface QuestionnaireState {
  // 当前问题索引 (0 到 totalQuestions-1)
  currentQuestionIndex: number;
  // 用户答案 { questionId: answer }
  answers: Record<number, string>;
  // 当前问题数据
  currentQuestion: Question | null;
  // 所有问题列表
  questions: Question[];
  // 总问题数
  totalQuestions: number;
  // 进度百分比 (0-100)
  progress: number;
  // 是否是第一个问题
  isFirstQuestion: boolean;
  // 是否是最后一个问题
  isLastQuestion: boolean;
  // 是否完成所有问卷
  isComplete: boolean;
  // 当前问题是否可以提交（必填问题已回答或选填问题）
  canSubmitQuestion: boolean;
}

export interface QuestionnaireActions {
  // 更新单个问题的答案
  updateAnswer: (questionId: number, value: string) => void;
  // 前往下一个问题
  goNextQuestion: () => void;
  // 前往上一个问题
  goPrevQuestion: () => void;
  // 跳转到指定问题
  goToQuestion: (index: number) => void;
  // 重置问卷
  reset: () => void;
  // 获取所有答案
  getAllAnswers: () => Record<number, string>;
}

export function useQuestionnaire(): QuestionnaireState & QuestionnaireActions {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const totalQuestions = getTotalQuestions();
  const questions = QUESTIONNAIRE_DATA;

  // 从 localStorage 加载数据
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem(STORAGE_KEY);
      const savedIndex = localStorage.getItem(QUESTION_INDEX_KEY);

      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      if (savedIndex) {
        const idx = parseInt(savedIndex, 10);
        if (!isNaN(idx) && idx >= 0 && idx < totalQuestions) {
          setCurrentQuestionIndex(idx);
        }
      }
    } catch (error) {
      console.error("Failed to load questionnaire state:", error);
    }
    setIsLoaded(true);
  }, [totalQuestions]);

  // 保存答案到 localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      } catch (error) {
        console.error("Failed to save answers:", error);
      }
    }
  }, [answers, isLoaded]);

  // 保存当前问题索引到 localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(
          QUESTION_INDEX_KEY,
          currentQuestionIndex.toString(),
        );
      } catch (error) {
        console.error("Failed to save question index:", error);
      }
    }
  }, [currentQuestionIndex, isLoaded]);

  // 当前问题
  const currentQuestion =
    currentQuestionIndex < totalQuestions
      ? questions[currentQuestionIndex]
      : null;

  // 计算进度（基于问题）
  const progress = useMemo(() => {
    return Math.round((currentQuestionIndex / totalQuestions) * 100);
  }, [currentQuestionIndex, totalQuestions]);

  // 检查当前问题是否可以提交
  const canSubmitQuestion = useMemo(() => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;
    return !!answers[currentQuestion.id]?.trim();
  }, [currentQuestion, answers]);

  // 是否完成所有问卷
  const isComplete = currentQuestionIndex >= totalQuestions;

  // 更新答案
  const updateAnswer = useCallback((questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }, []);

  // 下一个问题
  const goNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  // 上一个问题
  const goPrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  // 跳转到指定问题
  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index <= totalQuestions) {
        setCurrentQuestionIndex(index);
      }
    },
    [totalQuestions],
  );

  // 重置问卷
  const reset = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(QUESTION_INDEX_KEY);
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  }, []);

  // 获取所有答案
  const getAllAnswers = useCallback(() => {
    return { ...answers };
  }, [answers]);

  return {
    // State
    currentQuestionIndex,
    answers,
    currentQuestion,
    questions,
    totalQuestions,
    progress,
    isFirstQuestion: currentQuestionIndex === 0,
    isLastQuestion: currentQuestionIndex === totalQuestions - 1,
    isComplete,
    canSubmitQuestion,
    // Actions
    updateAnswer,
    goNextQuestion,
    goPrevQuestion,
    goToQuestion,
    reset,
    getAllAnswers,
  };
}
