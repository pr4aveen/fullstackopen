import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({name}) => (
    <>
      <h2>{name}</h2>
    </>
  )
  
  const Content = ({parts}) => (
    <div>
      {parts.map(part => 
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      )}
    </div>
  )
  
  const Part = ({name, exercises}) => (
    <p>
      {name} {exercises}
    </p>
  )
  
  const Total = ({parts}) => {
    const total = parts.reduce((a, b) => a + b.exercises, 0)
    return <p>Number of exercises {total}</p>
  }

export default Course