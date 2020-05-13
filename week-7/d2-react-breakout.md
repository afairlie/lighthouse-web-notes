# React Breakout

Axios in place of Ajax
`import Axios from 'axios'`

```
Axios
.get(https://apiURL.com)
.then(res => setCurrentWeatherData(res.data))
```

state is a mutable value

Location Component
```
event.preventDefault()

return <form onSubmit={handleSubmit}>
  <input type='text' name='location' placeholder='Location'>
</form>
```