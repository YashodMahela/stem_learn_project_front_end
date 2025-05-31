function Person(props) { 
  console.log(props);
  
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "12px 0 0 0",
      }}
    >
      <h1>My name is {props.name}</h1>
      <h2>I am {props.age} years old</h2>
      <h3>I live in {props.city}</h3>
    </div>
  );
}

export default Person;
