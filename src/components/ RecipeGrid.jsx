// Props are the parameters passed into the Component Function in React

//  Use Props if you need to create same component multiple times with different value

// Do not use props if you are using same standalone component multiple times without changing any of its data

//  use { } operator to pass multiple prop and (props) to pass single prop

export default function Button({ data = 'Add New', onClick }) {
  return (
    <button onClick={onClick}>
      <h2 className='text-2xl bg-brand-black rounded-2xl text-white m-4  p-4 '>
        {data}
      </h2>
    </button>
  )
}