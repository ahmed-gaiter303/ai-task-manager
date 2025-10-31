# AI Task Manager - Design Guidelines

## Design Approach
**Selected Framework**: Material Design with Dark Theme Adaptation
This productivity-focused dashboard requires clear information hierarchy, intuitive interactions, and visual feedback. Material Design principles provide the foundation, adapted for a sophisticated dark interface with modern gradient accents.

## Core Design Elements

### Typography
- **Primary Font**: Inter (Google Fonts) - exceptional readability for UI and data
- **Headings**: Font weights 600-700, sizes range from text-3xl (dashboard title) to text-lg (section headers)
- **Body Text**: Font weight 400-500, text-sm to text-base for task content and descriptions
- **Stats/Numbers**: Font weight 700, text-2xl to text-4xl for dashboard metrics
- **Micro-copy**: Font weight 500, text-xs for labels, timestamps, and metadata

### Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent rhythm
- Component padding: p-4 to p-6 for cards
- Section spacing: gap-6 to gap-8 for grids and lists
- Element margins: mb-2, mb-4, mb-8 for vertical flow
- Container max-width: max-w-7xl for main content area

**Grid Structure**:
- Dashboard stats: 4-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Task list: Single column with generous spacing
- Responsive breakpoints: Mobile-first, stack on sm/md, expand on lg+

### Visual Treatment (User-Specified)
- **Base Theme**: Dark slate/navy background (#0f172a, #1e293b tones)
- **Gradient Accent**: Cyan-to-purple gradient for highlights, CTAs, and active states
- **Priority Indicators**: 
  - High: Red/pink tones (#ef4444, #ec4899)
  - Medium: Yellow/amber tones (#f59e0b, #eab308)
  - Low: Green/emerald tones (#10b981, #22c55e)

### Component Library

#### Dashboard Stats Cards
- Elevated cards with subtle backdrop blur
- Large metric numbers (text-3xl to text-4xl)
- Descriptive labels below numbers
- Icon in top-right corner
- Hover effect: subtle lift with shadow increase
- Structure: Icon + Number + Label + Optional trend indicator

#### Task Item Card
- Full-width card with left border for priority indication
- Checkbox component on left for completion toggle
- Task title (text-base, font-medium)
- Priority badge (rounded pill with colored background)
- AI suggestion section (expandable/collapsible)
- Action buttons on right (edit, delete icons)
- Timestamp/metadata in footer
- Completed state: reduced opacity with strikethrough text

#### Task Input Form
- Floating label input fields
- Title input (text-base)
- Priority dropdown/select with visual indicators
- Description textarea (optional)
- Submit button with gradient background
- Form validation states

#### AI Suggestion Component
- Nested within task card or separate panel
- Robot/sparkle icon indicator
- Suggestion text in slightly muted tone
- "Get AI Suggestion" button when not loaded
- Loading state with subtle pulse animation
- Regenerate option for new suggestions

#### Navigation/Header
- Fixed top bar with app logo/title
- Search/filter input (if applicable)
- Add new task button (prominent, gradient)
- User profile or settings icon

#### Empty States
- Centered illustration or icon
- Encouraging message
- Primary CTA to add first task

### Interaction Patterns

#### Task Completion
- Checkbox toggle with smooth transition
- Strikethrough text animation
- Card opacity reduction to 60%
- Move to bottom of list or separate "Completed" section

#### Task Addition
- Modal overlay or slide-in panel
- Focus trap within form
- Auto-focus on title input
- Smooth entry animation

#### Task Deletion
- Confirmation prompt (subtle modal or inline)
- Slide-out animation on confirm
- Toast notification for undo option

#### Priority Visualization
- Colored left border (4px width) on task cards
- Small colored dot or pill badge
- Consistent color mapping across dashboard

### Animations (Minimal, Purposeful)
- Card hover: translateY(-2px) with shadow increase (0.2s ease)
- Task completion: opacity and strikethrough (0.3s ease)
- Task entry/exit: slide and fade (0.3s ease-out)
- Button interactions: scale(0.98) on active state
- Loading states: subtle pulse or skeleton screens
- NO scroll-triggered animations
- NO decorative background animations

### Responsive Behavior
- **Mobile (< 768px)**: 
  - Single column layout
  - Stack dashboard stats vertically
  - Full-width task cards
  - Bottom sheet for task creation
- **Tablet (768-1024px)**:
  - 2-column stats grid
  - Maintain single-column task list
- **Desktop (> 1024px)**:
  - 4-column stats grid
  - Optional sidebar for filters/categories
  - Maximum content width with centered container

### Accessibility
- Keyboard navigation for all interactions (Tab, Enter, Escape)
- ARIA labels for icon buttons
- Focus visible states with ring utility
- Color not sole indicator (combine with icons/text)
- Minimum contrast ratios maintained
- Screen reader announcements for task updates

### Key Design Principles
1. **Clarity over decoration**: Every element serves a functional purpose
2. **Consistent depth**: Use elevation sparingly to establish hierarchy
3. **Breathing room**: Generous spacing prevents visual clutter
4. **Immediate feedback**: All interactions provide visual confirmation
5. **Progressive disclosure**: AI suggestions expandable to reduce cognitive load

This design creates a professional, focused productivity tool that balances aesthetic appeal with functional efficiency.