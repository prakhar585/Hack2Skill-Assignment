Hack 2 skill Assignment

1. First thing First that is to create a Mock data using maps and sets

created mock data in an array and using maps and sets for fast lookups in dataGenerator.js

Now we have to create a rough mobile first structure of our application using tailwind css

create the admin dashboard with placeholders how everything will look and a sl

Mobile-First Thinking Process
1. Start with Mobile Constraints
Think about the smallest screen first (320px-640px):

Single column layout - everything stacks vertically
Touch-friendly targets - buttons/links at least 44px tall
Minimal information - show only essential data
Collapsible/hidden elements - use modals, drawers, accordions
Simplified navigation - hamburger menu, bottom tabs

2. Progressive Enhancement Strategy
As screens get larger, add features rather than removing them:

Mobile: Essential features only
Tablet: Add secondary information, side-by-side layouts
Desktop: Full feature set, multi-column layouts
Wide: Utilize extra space for better UX

3. Dashboard Layout Thinking
Mobile (default - 640px):
┌─────────────────┐
│   Header/Nav    │ ← Hamburger menu
├─────────────────┤
│                 │
│   Stats Cards   │ ← Stack vertically
│   (1 column)    │
│                 │
├─────────────────┤
│                 │
│   Main Content  │ ← Full width
│   (Table/etc)   │
│                 │
└─────────────────┘
Tablet (768px+):
┌─────────────────┐
│   Header/Nav    │ ← Expanded nav
├─────────────────┤
│  Stats  Stats   │ ← 2 columns
├─────────────────┤
│                 │
│   Main Content  │ ← Still full width
│                 │
└─────────────────┘
Desktop (1024px+):
┌───┬─────────────┐
│ S │   Header    │ ← Fixed sidebar
│ i ├─────────────┤
│ d │   Stats x3  │ ← 3-4 columns
│ e ├─────────────┤
│ b │             │
│ a │ Main Content│ ← Content area
│ r │             │
└───┴─────────────┘

Next step is to create the base structure using semantic tags if possible and how are they going to behave 

I will create ProductDashboard.jsx as a single soure of truth where my state will reside since we are only using hooks

while creating sidebar and navbar menu I came across a problem that they were disturbing the main layout of the tree so to solve this porblem I used React portals to handle it

while fetching the data I will use Lazy initialization because of which the fetching function will run only once throughtout hence a tiny bit optimiazation is achieved.

Then I will work on the ProductDashboard to get the data all at once but deliver it step by step in pieces of 10

then I will make a navigator for page we will call it the pagination menu 

I will also have to correct the order and create debouncing 

and add drag and drop and cart functionality to handle the website.

will add Out of stock in red 

Added Pagination now adding drag and drop in table

added drag and drop functionality to the table 

created Cart Context 