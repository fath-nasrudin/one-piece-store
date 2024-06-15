module.exports = {
  question: process.env.SECRET_QUESTION,
  answer: (process.env.SECRET_ANSWER || 'JAKARTA').toString().toLowerCase(),
}