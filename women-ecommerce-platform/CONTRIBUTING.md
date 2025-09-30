# Contributing to Women's E-Commerce Platform

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- Clear feature description
- Use case and benefits
- Potential implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   - Ensure all existing tests pass
   - Add new tests for new features
   - Test on different screen sizes (mobile, tablet, desktop)

5. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature description"
   ```
   
   Follow conventional commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code refactoring
   - `test:` for tests
   - `chore:` for maintenance

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference related issues
   - Include screenshots for UI changes

## Development Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Code Style

### Backend (TypeScript/Node.js)
- Use TypeScript for type safety
- Follow ESLint rules
- Use async/await for asynchronous operations
- Handle errors properly
- Add JSDoc comments for public functions

### Frontend (React/TypeScript)
- Use functional components with hooks
- Follow React best practices
- Use TypeScript interfaces for props
- Keep components small and focused
- Use meaningful variable names

### Database (Prisma)
- Follow Prisma naming conventions
- Add indexes for frequently queried fields
- Use proper relationships
- Add comments for complex schemas

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Documentation

- Update README.md for significant changes
- Update API_DOCUMENTATION.md for API changes
- Add inline comments for complex logic
- Update SETUP.md for setup process changes

## Review Process

1. All PRs require at least one review
2. CI/CD checks must pass
3. Code must follow style guidelines
4. Tests must pass
5. Documentation must be updated

## Questions?

Feel free to create an issue for any questions or clarifications.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.