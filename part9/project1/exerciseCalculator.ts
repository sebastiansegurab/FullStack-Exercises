interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments
 = (args: Array<string>): Data => {
  if (args.length < 9) throw new Error('Not enough arguments');
  if (args.length > 9) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

function calculateExercises(array: number[]): Result {
  const trainingDays: number = array.filter(n => n > 0).length
  let rating: number = 0
  let ratingDescription: string = ""
  const success: boolean = array.filter(n => n > 0).length === array.length
  if (trainingDays > 5) {
    rating = 3
    ratingDescription = "Good work"
  } else if (trainingDays <= 5 && trainingDays >= 3) {
    rating = 2
    ratingDescription = "You can try a little more"
  } else {
    rating = 1
    ratingDescription = "Stop wasting time"
  }
  let result: Result = {
    periodLength: array.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: success ? 2 : 1,
    average: array.reduce((a, b) => a + b, 0) / array.length
  }
  console.log(result)
  return result
}

calculateExercises([3, 0, 2, 4.5, 0, 3, 1])