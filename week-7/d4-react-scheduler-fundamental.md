# React Review of Fundamentals so Far

## Props

props are for sharing (down) - you can share up with a function passed down by props. They're basically for passing things up and down between the components

## State
state is for keeping track of stuff. 
You can use state inside a child component. If i have state at different levels, it's ok, and it's actually recommended.
if the application doesn't need to know about something, you don't need to have it track state at higher level ex: you change the color of a button on click, and you want to know in the component what color it is, but the application has no use for that info, you don't need to store the state in the parent component.

pass it back up if the user saves the appointment. if the state is "local" vs 'global" of the applicaiton. FOr state: YOu need to be thinking about if only the component needs to know about the state, or if it needs to be known/saved in a wider context (parents)

* at what level does data need to be known, and does that data need to be saved, or does it just need to be rendered?
- state saves (persists) data.

## Hooks
hooks are for doing (pretty much anything). You can set, change, and save state in a components, or track state in a custom hook.

## Scheduler Architecture

in this architecture: 
the further down the tree you go, the more simple the node should be
all the api stuff happens at the App level, the props pass down the data to the children, then send the results of what they capture to the parent
- the applicaiton saves state to keep track of it in the api

# Following Data Down from Application > Appointment 
## + Daylist manipulating back up to Application

## Application.js

```
import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment'
import getAppointmentsForDay from '../helpers/selectors';

import "components/Application.scss";

// a feature of this architecture: keep persistent stuff all in the same level up above

export default function Application(props) {
  // this sets monday on initial render
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  // this useEffect only executes once AFTER render of all components and updates the virtual DOM accordingly.
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments'))
    ])
    .then(all => {
      setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data}))
    })
  }, [])

  // if "" is given for day state (instead of MOnday) on initial render, getAppointmentsForDay() will return a blank array. it does run every time there's a state change.
  const appointments = getAppointmentsForDay(state, state.day);
  console.log(appointments)

  // if there's no day on initial render, this won't render empty Appointments. Why? this would be trying to map an empty array?
  const appointmentList = appointments.map( appointment => {
    // appointment.map is called with an empty array, so it returns nothing, although Appointment component is still being called.. 
    return <Appointment key={appointment.id} {...appointment}/>
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        /> 
        <hr className='sidebar__separator sidebar--centered'></hr>
        <nav className='sidebar__menu'>
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img 
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className="schedule">
        {appointmentList}
        {/* only below this shows up if day state is empty on first render. That's because with no day, getAppointmentsForDay and appointments.map run at every render, but have nothing to return */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
```

## Appointment.js
```
import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';


import './styles.scss';

export default function Appointment(props) {
  const {time, interview} = props;
  // appointments.map (in application to generate list of appoitments on a given day) is called and Appointment component does try to mount? but .map returns nothing when run with empty array

  return <article className="appointment">
    <Header time={time}/>
    {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
  </article>
}
```

## Daylist.js
```
import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const {days, day, setDay} = props;
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

  const list = days.map((dayItem) => {
    const {id, name, spots } = dayItem;
    return <DayListItem 
      key={id}
      name={name}
      spots={spots}
      selected={name === day}
      // this triggers day change, which triggers re-render
      setDay={(event) => setDay(name)}
    />
  })

  return <ul>{list}</ul>
}
```