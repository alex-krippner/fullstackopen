import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

const App = ({anecdotes}) => {
  const initialArray = new Uint8Array(anecdotes.length);
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...initialArray])

  const handleRandomAnecdote = () =>  {
    const randomAnectodeIdx = getRandomNum(0, anecdotes.length-1)
    setSelected(randomAnectodeIdx); 
  }

  const handleVote = (selected) =>{
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy);     
}

const mostVotes =  Math.max(...votes);
const indexOfMostVotedAnecdote = votes.findIndex(el => el === mostVotes);

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <div>
          {anecdotes[selected]}      
        </div>
        <p>has {votes[selected]} votes</p>
        <button onClick={() => handleVote(selected)}>vote</button>
        <button onClick={() => handleRandomAnecdote()}>Next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
          <div>
            {anecdotes[indexOfMostVotedAnecdote]}
          </div>
          <p>has {mostVotes} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>, document.getElementById('root')
)