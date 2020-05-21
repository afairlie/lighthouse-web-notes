# Integration Testing Notes

TO SEE TEST COVERAGE: `npm test -- --coverage --watchAll=false`
can view html report (found in coverage/lcov-report) in browser

### Integration Test: Book an Appointment

Some important things to remember:
- axios mock: make sure the file is named properly. jest will use files in `__mocks__` directory. In this case, in the actual application have to do axios.put, not axio({method: put}) because the mock won't handle that (I guess unless you design the mock to handle param objects?)
- async await and query element within container by first apointment student name to *ensure list of appointments is rendered on DOM*
- prettyDOM to console.log() the current state of the DOM as you build queries
- console.log(container) will show you react fibers
- debug(appointment) works the same as console.log(prettyDOM(appointment)) (I think?)


**Application.test.js**
```
import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";
import axios from '__mocks__/axios.js';

afterEach(cleanup);

describe('Application', () => {
  xit("renders without crashing", () => {
    render(<Application />);
  });
  
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText('Tuesday'))
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  })
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: { value: "Lydia Miller-Jones" }});
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))
    console.log(prettyDOM(appointment))
  })
})
```

**axios.js - AXIOS MOCK**
```
const fixtures = {
  days: [{...}, {...}, etc],
  appointments: { 1: {...}, 2: {...}, etc},
  interviewers: {1: {...}, 2: {...}, etc}
}

export default {
  get: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days
      });
    }

    if (url === "/api/appointments") {
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: fixtures.appointments
      })
    }

    if (url === "/api/interviewers") {
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: fixtures.interviewers
      })
    }
  }),
  put: jest.fn(() => {
    return Promise.resolve({
      status: 204, 
      statusText: "No Content"
    })
  })
}
```

## Final Application.test.js

```
import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";
import axios from '__mocks__/axios.js';

afterEach(cleanup);

describe('Application', () => {
  xit("renders without crashing", () => {
    render(<Application />);
  });
  
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText('Tuesday'))
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  })
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {target: { value: "Lydia Miller-Jones" }});
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const monday = getAllByTestId(container, "day")[0]

    expect(getByText(monday, 'no spots remaining'))
    // debug(monday)
  })
})
```

**BETTER SOLUTION for `monday = getAllByTestId(etc.)`**
```
const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
);

console.log(prettyDOM(day));
```