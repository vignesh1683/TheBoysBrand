# The Boys Brand React Web Application Documentation

This project is a simple web application built with React. It utilizes the react-router-dom library for routing.

## File Structure

- `App.js`: Main component of the application.
- `Home.js`: Contains the landing page of the site.
- `Mens.js`: Contains the main js functions which is related to Mens tab.
- `styles/`: Contains all CSS file.
- `assects`: Contains all the image file.

## Components

- **Navbar**: Displays the navigation bar which contains the MEN and WOMEN sections.
- **Hero**: Developed a Carousel from scratch using `CSS` and `Java Script` for displaying images in it. It also has buttons to navigate through the images.
- **Mens**: Designed a card view using `CSS` for showcasing the Men's products.
- **Women**: Designed a card view using `CSS` for showcasing the women's products.
- **Footer**: Displays the footer of the application.
- **MensPage**: Displays the men's page that only contains men's products.

## Functions

- **App()**: Main function of the application. It returns the `BrowserRouter` component with defined routes.
- **Home()**: Returns the main layout of the application.
- **Mens()**: Returns the layout for the men's page.

## Routing

The application uses `react-router-dom` for routing. The `BrowserRouter` component wraps the entire application. Inside `BrowserRouter`, the `Routes` component defines different routes. Each `Route` component specifies a path and the component to render when that path is visited.

- The `/` path renders the `Home` component which includes the Navbar, Hero, Mens, Women, and Footer components.
- The `/mens` path renders the `Mens` component which includes the Navbar, MensPage, and Footer components.

## Asset Usage

### Images
- `logo`: The logo image used in the application.
- `front`: An image representing the carousel image.
- `mdress`: An image representing a men's dress.
- `plain`: An image representing a plain heart icon.
- `active`: An image representing an active (colored) heart icon.
- `wdress`: An image representing a women's dress.

## External Dependencies

- The component uses the `react-router-dom` library for routing.
- It utilizes the `react-slick` library for implementing sliders.

## `useState` Hook

- `modalOpen`: State variable to control the visibility of a modal. Initialized as `false`.
- `selectedOption`: State variable to store the selected option. Initialized as an empty string.

## Functions

- `openModal`: Function to open the modal. It sets the `modalOpen` state to `true`.
- `closeModal`: Function to close the modal. It sets the `modalOpen` state to `false`.
- `handleChange`: Function to handle changes in a form input field. It updates the `selectedOption` state with the new value.

## Carousel Settings

### `carouselSettings` Object

- Defines settings for a carousel component.
- Properties:
  - `dots`: Enables/disables navigation dots.
  - `infinite`: Enables infinite loop for carousel items.
  - `speed`: Defines the transition speed of carousel items.
  - `slidesToShow`: Specifies the number of slides to show at once.
  - `slidesToScroll`: Specifies the number of slides to scroll per action.


## CSS Properties

### Width and Height

- `width`: Used to specify the width of various elements throughout the stylesheet.
- `height`: Used to specify the height of various elements throughout the stylesheet.

### Display

- `display`: Determines the display behavior of elements, used for flex layout and other purposes.

### Positioning

- `position`: Defines the positioning method used for elements, such as `relative`, `absolute`, and `fixed`.
- `top`, `left`, `right`, `bottom`: Specifies the offset position of positioned elements.

### Flexbox

- `justify-content`: Aligns flex items along the main axis of the flex container.
- `align-items`: Aligns flex items along the cross axis of the flex container.
- `flex-direction`: Establishes the main-axis direction of flex items.
- `flex-wrap`: Controls whether the flex container is single-line or multi-line.
- `aline-content` : Aligns the flex container’s lines within the flex container.

### Padding and Margin

- `padding`: Defines the inner spacing of an element.
- `margin`: Specifies the outer spacing of an element.

### Background

- `background-color`: Sets the background color of an element.

### Text

- `text-decoration`: Specifies decorations added to text.
- `color`: Sets the text color.

### Border

- `border`: Defines the border of an element, including its width, style, and color.
- `border-radius`: Sets the radius of the element's corners.

### Transition

- `transition`: Specifies the transition effect to be applied to an element.
- `transition-property`: Specifies the name of the CSS property to which the transition is applied.
- `transition-duration`: Specifies the duration over which the transition occurs.
- `transition-timing-function`: Specifies the speed curve of the transition effect.
- `webkit-transition`: Provides compatibility for the `-webkit-appearance` property in WebKit browsers 
- `tranform`: Allows you to manipulate the visual representation of an object. It provides a way to rotate, scale.

### Font

- `font-size`: Sets the size of the font.
- `font-weight`: Specifies the weight (boldness) of the font.

### Cursor

- `cursor`: Specifies the type of cursor to be displayed when pointing over an element.

### Opacity

- `opacity`: Sets the transparency level for an element.

### Others

- `text-transform`: Controls the capitalization of text.
- `text-align`: Specifies the horizontal alignment of text.
- `text-transform`: Controls the capitalization of text.
- `letter-spacing`: Sets the spacing behavior between text characters.
- `z-index` : The z-index property specifies the stack order of an element. An element with greater stack order will be in front of another element with at back.
- `accent-color` : Sets the color of emphasized content.





