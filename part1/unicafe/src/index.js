import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({btnType, handleClick}) => <button onClick={() => handleClick(btnType)}>{btnType}</button>;
const Statistic = ({stat, text}) => <p>{text} {stat}</p>

const Statistics = ({stateObj}) => {
  const {good, neutral, bad} = stateObj;

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
    </table>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stateObj = {good, neutral, bad }
  const buttonArray = ['good', 'neutral', 'bad'];

  const handleClick = (btnType) => {
    if (btnType === 'good') setGood(good + 1);
    if (btnType === 'neutral') setNeutral(neutral + 1);
    if (btnType === 'bad') setBad(bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      {buttonArray.map(btnType => <Button btnType={btnType} handleClick={handleClick}/>)}
      <h2>statistics</h2>
      {(good + neutral + bad) === 0 ? (<p>No feedback given</p>) : (<Statistics stateObj={stateObj}/>)}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)