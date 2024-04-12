import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <body>
      <h1>Hello!</h1>
      <p>
        <button onClick$={() => alert('42')}>Click me</button>
      </p>
    </body>
  )
})
