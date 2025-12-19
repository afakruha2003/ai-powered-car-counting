# Design Guidelines

## General Guidelines

* Only use absolute positioning when necessary. Opt for responsive and well-structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files

## Design System Guidelines

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options


## Component Guidelines

### Button
The Button component is a fundamental interactive element in the design system, designed to trigger actions or navigate users through the application.

**Usage**: Buttons should be used for important actions that users need to take, such as form submissions, confirming choices, or initiating processes.

**Variants**:
* **Primary Button** - Used for the main action in a section or page
* **Secondary Button** - Used for alternative or supporting actions  
* **Tertiary Button** - Used for the least important actions
