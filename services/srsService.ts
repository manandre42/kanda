
import { Flashcard } from '../types';

/**
 * SuperMemo-2 (SM-2) inspired algorithm.
 * 
 * Quality Ratings:
 * 0 - Blackout (Complete failure to recall)
 * 1 - Incorrect (Wrong answer, but familiar)
 * 2 - Hard (Correct but required intense concentration)
 * 3 - Good (Correct with little hesitation)
 * 4 - Easy (Perfect recall)
 */
export const calculateNextReview = (card: Flashcard, quality: number): Flashcard => {
  let { interval, repetitions, easeFactor } = card;

  if (quality >= 3) {
    // Correct response logic
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response reset
    repetitions = 0;
    interval = 1;
  }

  // Update Ease Factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  // We map our simplified 4-button UI to the 0-5 scale internally if needed, 
  // but here we assume quality is passed as:
  // 0 (Again), 1 (Hard - technically correct but hard), 2 (Good), 3 (Easy) -> Mapped for calc below
  
  // Mapping UI buttons to SM-2 Scale (0-5)
  // Button "Again" (Failed) -> 0
  // Button "Hard" (Struggled) -> 3
  // Button "Good" (Normal) -> 4
  // Button "Easy" (Perfect) -> 5
  
  let sm2Quality = 0;
  if (quality === 0) sm2Quality = 0; // Fail
  if (quality === 1) sm2Quality = 3; // Hard pass
  if (quality === 2) sm2Quality = 4; // Good pass
  if (quality === 3) sm2Quality = 5; // Easy pass

  easeFactor = easeFactor + (0.1 - (5 - sm2Quality) * (0.08 + (5 - sm2Quality) * 0.02));
  
  // EF minimum floor
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    ...card,
    interval,
    repetitions,
    easeFactor,
    nextReviewDate: nextDate
  };
};

export const getDueDateLabel = (interval: number): string => {
    if (interval === 1) return '1d';
    if (interval < 30) return `${interval}d`;
    return `${Math.round(interval/30)}m`;
}
