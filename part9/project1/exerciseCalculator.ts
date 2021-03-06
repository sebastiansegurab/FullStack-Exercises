interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export function calculateExercises(array: number[], targetP: number): Result {
  const trainingDays: number = array.filter(n => n > 0).length;
  let rating = 0;
  let ratingDescription = "";
  const success: boolean = array.filter(n => n > 0).length === array.length;
  if (trainingDays > 5) {
    rating = 3;
    ratingDescription = "Good work";
  } else if (trainingDays <= 5 && trainingDays >= 3) {
    rating = 2;
    ratingDescription = "You can try a little more";
  } else {
    rating = 1;
    ratingDescription = "Stop wasting time";
  }
  const result: Result = {
    periodLength: array.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetP,
    average: array.reduce((a, b) => a + b, 0) / array.length
  };
  return result;
}