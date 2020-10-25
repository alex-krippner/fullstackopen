import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({btnType, handleClick}) => <button onClick={() => handleClick(btnType)}>{btnType}</button>;
const Statistic = ({stat, text}) => <p>{text} {stat}</p>

const Statistics = ({ratings}) => {
  const {good, neutral, bad} = ratings;

  const calc = (calcType) => {
    let result;
    let rating = good - bad;    
    const all = good + neutral + bad;
    const avg = rating/all;

    if (calcType === 'all') result = good + neutral + bad;
    if (calcType === 'avg') result = avg || 0;
    if (calcType === 'pos') result = `${(good / all) * 100 || 0}%`;
    
    return result
    }

  return(
    <table>
      <tbody>
        <tr>
          <td>
            <Statistic stat={good} text='good'/>
          </td>
        </tr>
        <tr>
          <td>
            <Statistic stat={neutral} text='neutral'/>
          </td>
        </tr>
        <tr>
          <td>
            <Statistic stat={bad} text='bad'/> 
          </td>
        </tr>
        <tr>
          <td>
            <Statistic stat={calc('all')} text='all'/> 
          </td>
        </tr>
        <tr>
          <td>
            <Statistic stat={calc('avg')} text='average'/> 
          </td>
        </tr>
        <tr>
          <td>
            <Statistic stat={calc('pos')} text='positive'/> 
          </td>
        </tr>
      </tbody>
    </table>
    )
}

const App = () => {
  const [ratings, setRating] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })
  const buttonArray = ['good', 'neutral', 'bad'];

  const handleClick = (btnType) => {
    if (btnType === 'good') setRating({...ratings, good: ratings.good + 1});
    if (btnType === 'neutral') setRating({...ratings, neutral: ratings.neutral + 1});
    if (btnType === 'bad') setRating({...ratings, bad: ratings.bad + 1});
  }

  return (
    <div>
      <h2>give feedback</h2>
      {buttonArray.map(btnType => <Button key={btnType} btnType={btnType} handleClick={handleClick}/>)}
      <h2>statistics</h2>
      {(ratings.good + ratings.neutral + ratings.bad) === 0 ? (<p>No feedback given</p>) : (<Statistics ratings={ratings}/>)}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)