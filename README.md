# NotesApp

A modern, feature-rich note-taking application built with Next.js and React. NotesApp allows you to create, organize, and manage your notes efficiently with support for hashtags, search, and a clean, responsive UI.

---

## Features

- **Create, Edit, and Delete Notes**: Easily manage your notes with a user-friendly interface.
- **Hashtag Support**: Add hashtags to your notes for better organization and quick filtering.
- **Search Functionality**: Instantly find notes using the search bar.
- **Note Summarization with Gemini AI**: Summarize your notes using integrated Gemini AI technology.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Modern UI**: Built with Material UI and custom CSS for a beautiful look.
- **State Management**: Uses a centralized store for efficient state handling.
- **Code Quality**: Enforced with ESLint and Prettier for consistent code style.

---

## Project Structure

```
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
README.md
tsconfig.json
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    common/
      header/
      toggle/
    home/
      left-panel/
        new-note/
        notes-list/
          chips-row/
        search-bar/
      right-panel/
        create-note/
          chips/
          tools/
        new-note/
        preview-note/
  store/
    store.ts
  utils/
    constants.ts
    functions.ts
    gemini.ts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd NotesApp
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

- **Create a Note:** Use the right panel to add a new note. Add hashtags by typing and pressing space.
- **View Notes:** All notes are listed in the left panel. Click to view or edit.
- **Search:** Use the search bar to filter notes by content or hashtag.
- **Delete:** Remove notes or hashtags with the delete button.

---

## Customization

- **Themes:** The app uses the "Palenight Theme" and Material Icon Theme by default. You can change these in your VS Code settings.
- **Formatting:** Prettier is set as the default code formatter. Code is auto-formatted on save.
- **Environment Variables:** If you add integrations (e.g., OpenAI, Gemini), store API keys in a `.env.local` file (not committed to git).

---

## Code Quality

- **Linting:**
  - ESLint is configured for code linting.
  - Run `npm run lint` to check for lint errors.
- **Formatting:**
  - Prettier is used for consistent code formatting.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Gemini AI](https://deepmind.google/technologies/gemini/) – Used for note summarization

---

## Contact

For questions or support, please open an issue or contact the maintainer.
