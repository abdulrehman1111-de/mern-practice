import React, { useState } from 'react'

const Rating = () => {

  let [rating, setRating] = useState(0);

  const getFeedbackText = () => {
    if (rating === 0) {
      return "Please select a rating!";
    }
    else if ((rating === 1) || (rating === 2)) {
      return "Sorry to hear that!";
    }
    else if (rating === 3) {
      return "Thanks for your feedback";
    }
    else if ((rating === 4) || (rating === 5)) {
      return "Awesome! Glad you loved it!";
    }
  }

  const getFeedbackStars = () => {
    if (rating === 0) {
      return "";
    }
    else if (rating === 1) {
      return "⭐";
    }
    else if (rating === 2) {
      return "⭐⭐";
    }
    else if (rating === 3) {
      return "⭐⭐⭐";
    }
    else if (rating === 4) {
      return "⭐⭐⭐⭐";
    }
    else if (rating === 5) {
      return "⭐⭐⭐⭐⭐";
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
        
        <h2 className="text-2xl font-bold text-white tracking-wide">Course Feedback</h2>
        
        <div className="flex justify-center gap-3">
          <button onClick={() => setRating(rating = 1)} className='bg-slate-700 hover:bg-amber-500 text-white font-bold text-xl h-12 w-12 rounded-xl transition duration-200 active:scale-95 shadow-md'>1</button>
          <button onClick={() => setRating(rating = 2)} className='bg-slate-700 hover:bg-amber-500 text-white font-bold text-xl h-12 w-12 rounded-xl transition duration-200 active:scale-95 shadow-md'>2</button>
          <button onClick={() => setRating(rating = 3)} className='bg-slate-700 hover:bg-amber-500 text-white font-bold text-xl h-12 w-12 rounded-xl transition duration-200 active:scale-95 shadow-md'>3</button>
          <button onClick={() => setRating(rating = 4)} className='bg-slate-700 hover:bg-amber-500 text-white font-bold text-xl h-12 w-12 rounded-xl transition duration-200 active:scale-95 shadow-md'>4</button>
          <button onClick={() => setRating(rating = 5)} className='bg-slate-700 hover:bg-amber-500 text-white font-bold text-xl h-12 w-12 rounded-xl transition duration-200 active:scale-95 shadow-md'>5</button>
        </div>

        <button onClick={() => setRating(rating = 0)} className='w-full bg-slate-700 hover:bg-red-500 text-slate-300 hover:text-white font-semibold py-2 rounded-xl transition duration-200'>Reset</button>

        <div className='p-6 bg-slate-900/60 rounded-xl border border-slate-700/50 min-h-[100px] flex flex-col items-center justify-center space-y-2'>
          <p className="text-lg font-medium text-slate-200">{getFeedbackText()}</p>
          <p className="text-2xl tracking-widest">{getFeedbackStars()}</p>
        </div>

      </div>
    </div>
  )
}

export default Rating