# SpringPortfolio Client

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge)]()
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange?style=for-the-badge)]()
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue?style=for-the-badge)]()

**SpringPortfolio Client** is a decoupled vanilla JavaScript front-end designed to consume and render data from the SpringPortfolio REST API. It dynamically constructs the user interface based on JSON payloads, eliminating the need for hardcoded HTML project entries.

---

## Core Architecture & Technical Highlights

### 1. Asynchronous Data Consumption
The client utilises the native Fetch API to establish a connection with the backend server.
* **Promise Resolution:** Executes asynchronous HTTP `GET` requests to retrieve project data, parsing the resulting JSON payload for client-side processing.
* **Error Handling:** Implements `.catch()` blocks to log network failures or API unavailability without crashing the wider application.

### 2. Dynamic DOM Manipulation
Replaces static HTML with programmatic rendering logic.
* **Iterative Construction:** Utilises nested `for` and `forEach` loops to iterate through complex data arrays (tags, technical decisions, embedded links) and compile contextual HTML strings.
* **Safe Injection:** Employs `insertAdjacentHTML` to append generated project cards to the Document Object Model (DOM) without overwriting existing container structures or native elements.
* **Conditional Formatting:** Evaluates the `displayOrder` integer using modulo arithmetic (`displayOrder % 2 === 0`) to automatically alternate the physical layout direction of the rendered project cards.

### 3. Scroll-Based Event Observation
Implements native browser APIs to manage render performance and trigger UI state changes.
* **Intersection Observers:** Registers `IntersectionObserver` instances to detect when dynamically injected project elements enter the viewport. This triggers CSS fade-in animations asynchronously, avoiding the performance overhead of traditional scroll event listeners.
* **Navigational State:** Monitors `window.scrollY` and element bounding client rectangles to conditionally apply sticky navigation classes and manage mobile menu visibility.

---

## Proposed Iterations

The current architecture relies entirely on the backend API to serve the JSON payload in the correct sequential order. Planned future enhancements include:

* **Client-Side Sorting Logic:** Implement a native `Array.prototype.sort()` function on the retrieved `projects` array prior to executing the DOM injection. This will guarantee the elements are rendered strictly according to their `displayOrder` integer, establishing a secondary layer of structural validation regardless of the initial JSON array sequence provided by the server.
