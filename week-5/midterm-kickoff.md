# Midterm Kickoff

## Draft Plan
- Develop User Story:
  - As a user .. role
  - I want to .. goal
  - Because .. benefit
  ex: Title: users should see a lit of the available maps
    - User story: As a user, I want to see all the available maps because I want to be able to quickly select 
  - our user stories are the **requirements of each projects**
- MVP: Minimum Viable Product
  - minimum set of features that makes your product usable.
  - follow small iterations
  - if you want to do something not in requirements, you must do it as a stretch feature
- Wireframes
  - use a prototyping tool like **Figma**
  - prioritize layout (colours, icons not important in wireframe)
  - will we design for mobile first?
- Data
  - design ERD according to wireframe and requirements
  - Tables are nouns, they can be taken directly from User Stories
  - What are the relationships?
  - use **draw.io**
  - Follor conventions: 
    - Table names are *plural*
    - Primary key is `id`
    - foreign key is `tablename_id`
- Routes
  - Remember REST pattern
  - <u>refer to REST table</u>
- Stack Choices
  - Made for us except for UI (choice)
- Choose between SPA vs MPA
  - MPA (Multi-Page App) is model of TinyApp: every page is built by server with ejs
    - triggers a page reload
  - SPA (Single Page App) is model of Tweeter: 
    - SPA makes sense for highly interactive UI (is ours highly interactive?)
    - only one HTML page on backend: index.ejs (sent on first request to client)
    - AJAX request only require data on back end.
    - does not trigger page relaod
    - benefit of using SPA is no page reload
- Dividing Tasks
  - Vertical:
    - break the project out into features
    - prioritize the features
    - each developer would build a feature full stack
  - Horizontal:
    *make sure you're collaborating very closely BECAUSE DATA NEEDS TO MATCH*
    - Break the project down into technical domains
    - one or more developers will be responsible for an entire domain
    - Domains could be ui, api, db
  - Do pair programming at the beginning (but don't do throughout)


FRONTEND (Client Side):
  - CSS
  - Javascript generating HTML
  - AJAX

BACKEND (Server/Database):
  - Server
  - Routes
  - DB

### User Authentication
- For this project, don't need to develop full authentication system
- include a couple pre-defined users in db
- put it as a stretch to make operational authentication

### Mentors
- Do reach out to mentors
- ASK MENTORS TO REVIEW PLAN
  - Especially Wireframe, ERD, Routes

### Communication
- Communication is critical no matter which way you divide tasks. 
- Make sure everything is on track, touch base throughout the day. 
- Merge regularly (?)
- Notify your partner if somehting isn't working, if you need their help, or plan to reach out to mentor
- Project Follow-Ups
  @ Early to mid-day
  - T: What you worked on Today
  - R: what roadblocks you encountered
  - W: what accomplishments you achieved
  - %: percentage of completion

### Teamwork
- Use tools: slack, trello
- be supportive of each other's ideas
- be willing to let something go
- follow the agreed-upon processes
- show up
- do what you say you'll do
- if you can't, communicate with your team
- own up to your mistakes
- give feedback kindly
- be open to suggestions
- *it's only a midterm project* :)

## Project Workflow

- See lecture kickoff for git workflow, project setup, etc.

### Git Repository
- 1 partner use template
- add other partner(s) as collaborator

### Setup DB
- faker.js for data
  - require faker at top of seed file
  (see documentation for syntax etc.)
- comment pseudocode what you're writing
- use curl, postman, or **insomnia** to test backend (make requests) without frontend
- app.use(bodyParser.json()); to receive AJAX requests (server default setup setup only for URL encoded )

```
const query = {
  text: `INSERT INTO unsers(name) VALUES($1) RETURNING *`,
  values: [username]
}
```
### Git Workflow
- NEVER CODE ON MASTER
- every time you work on a feature, create a new branch, pull, then merge to master
- integrate features frequently

```
git checkout -b feature/<branch1>
git branch (on feature/<branch1>)
git commit
git checkout master
git pull (make sure another )
git merge feature/<branch1>
git status
(git push -u origin master)
git push - notify partner "i've pushed to master, you can pull"
(repeat)
```
(if needed, but shouldn't be necessary)
```
git reset -- hard
git checkout master
git merge feature/
git checkout -b feature/project_setup_fix
(and then merge this branch to master)
```
### Project Manager
- Trello

### Timeline
- Planning D1
- Project Setup D2 (Setup due by Mon morning latest)
  - DB setup and ready to go by Mon morn.