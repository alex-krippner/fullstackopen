const Header = ({ courseName }) => {
    return (
      <h1>{courseName}</h1>
    )
  }
  
  const Total = ({ courseParts }) => {
    const sum = courseParts.reduce((sum, currentPart) => sum + currentPart.exercises, 0)
    return(
      <p>total of {sum} exercises</p>
    ) 
  }
  
  const Part = ({partName, partExercises}) => {
    return (
      <p>
        {partName} {partExercises}
      </p>    
    )
  }
  
  const Content = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map(part =>
            <Part partName={part.name} partExercises={part.exercises}/>
          )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header courseName={course.name}/>
        <Content courseParts={course.parts}/>
        <Total courseParts={course.parts}/>
      </div>
    )
  }

  export default Course