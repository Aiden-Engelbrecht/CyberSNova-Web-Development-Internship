# Daymark To-Do List Application

## Project Information

- **Internship domain:** Web Development
- **Difficulty level:** Beginner
- **Project:** To-Do List Application
- **Author:** Aiden Engelbrecht
- **Internship period:** October 2026

## Project Overview

Daymark is a responsive task-management application for organising
daily work. Users can add tasks, assign due dates, edit task details,
mark tasks as completed and remove tasks.

Tasks can be viewed as a dated list or on a monthly calendar. The
application uses browser session storage to preserve task information
while the current browser session remains active.

## Project Objectives

The objectives of this project were to:

- Create a clean task-management interface.
- Allow users to add, edit and delete tasks.
- Allow tasks to be marked as completed.
- Maintain task status during the current browser session.
- Organise tasks according to their due dates.
- Provide filters for different task statuses.
- Create responsive list and calendar views.
- Provide clear feedback after user actions.

## Features

- Add new tasks
- Assign due dates
- Edit task descriptions and due dates
- Delete individual tasks
- Mark tasks as completed
- Filter all, active and completed tasks
- Switch between list and calendar views
- Group tasks according to date
- Collapse and expand dated task groups
- View tasks for a selected calendar date
- Navigate between calendar months
- Clear completed tasks
- Delete all tasks
- Display the number of remaining tasks
- Display character counts
- Show confirmation notifications
- Preserve tasks using `sessionStorage`
- Responsive desktop, tablet and mobile layouts

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Session Storage
- Google Fonts
- Visual Studio Code
- Git
- GitHub

The interface uses the **Inter** and **Fraunces** typefaces from
Google Fonts.

## Project Structure

```text
04-todo-list/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── todo.js
└── README.md
```

## How to Run the Project

1. Download or clone the internship repository.
2. Open the `beginner-level/04-todo-list` folder.
3. Open `index.html` in a modern web browser.

Alternatively, open the project in Visual Studio Code and run
`index.html` using the Live Server extension.

## How to Use the Application

### Adding a Task

1. Enter the task description.
2. Select a due date.
3. Select the **Add** button.

The new task will be added to the task list and saved in the current
browser session.

### Completing a Task

Select the circle or checkbox beside a task. The task will be marked
as completed and displayed with a line through its description.

### Editing a Task

Select the edit button beside a task. Update the task description or
due date in the edit window, and then select **Save changes**.

### Deleting a Task

Select the delete button beside a task to remove it from the
application.

### Filtering Tasks

The following filters are available:

- **All:** Displays every task.
- **Active:** Displays tasks that have not been completed.
- **Completed:** Displays completed tasks only.

### Calendar View

Select **Calendar** to display tasks according to their due dates.

- Use the arrow buttons to move between months.
- Dates containing tasks are marked with an indicator.
- Select a date to view its scheduled tasks.
- Tasks can be edited or deleted from the calendar task popover.

### Clearing Tasks

- **Clear completed** removes all completed tasks.
- **Delete all** removes every task after confirmation.

## Session Storage

Daymark uses the browser's `sessionStorage` feature.

The following information is stored:

- Task descriptions
- Task due dates
- Completion status
- Collapsed task groups

Tasks remain available when the page is refreshed during the same
browser session. The data is normally removed after the browser tab
or session is closed.

No task information is sent to a server or saved in a database.

## Data Structure

Each task is represented as a JavaScript object containing:

```javascript
{
    id: "unique-task-id",
    text: "Task description",
    date: "2026-10-21",
    completed: false
}
```

The task ID is used to locate the correct task when editing,
completing or deleting it.

## Validation

The application validates task information before creating or
updating a task.

- A task description cannot be empty.
- Task descriptions are limited to 120 characters.
- A due date is required when adding a task.
- Character counters help users remain within the limit.
- Error messages are displayed when the information is invalid.

## Responsive Design

The application adapts to different screen sizes using CSS media
queries. Controls, task fields, calendar cells and modal content
resize or stack on smaller screens.

The interface was designed for:

- Desktop computers
- Tablets
- Mobile phones

## Testing Performed

The following functionality was tested:

- Adding a valid task
- Submitting an empty task
- Selecting a due date
- Editing a task description
- Editing a task due date
- Marking a task as completed
- Reopening a completed task
- Deleting an individual task
- Filtering active tasks
- Filtering completed tasks
- Clearing completed tasks
- Deleting all tasks
- Switching between list and calendar views
- Moving between calendar months
- Opening a calendar date containing tasks
- Refreshing the page during the same session
- Collapsing and expanding date groups
- Desktop, tablet and mobile layouts

The browser console was also checked for JavaScript errors.

## Limitations

- Tasks are only retained for the current browser session.
- Tasks are not synchronised between different devices.
- The application does not use user accounts.
- Tasks are not stored in an external database.
- It does not currently support reminders or notifications.
- It does not support recurring tasks.

## Future Improvements

Possible future improvements include:

- Persistent storage using `localStorage` or a database
- User authentication
- Task priorities
- Categories and labels
- Search functionality
- Recurring tasks
- Reminder notifications
- Drag-and-drop task ordering
- Cloud synchronisation

## Author

**Aiden Engelbrecht**  
CyberSNova Web Development Internship  
October 2026