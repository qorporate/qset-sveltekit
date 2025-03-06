# CONTRIBUTING

 Here’s how our Git workflow works:

---

## **1. Start with the `dev` Branch**

- The `dev` branch is the default branch and contains the latest working code.
- **Always create new branches from `dev`** to ensure you’re building on the most up-to-date codebase.

---

## **2. Create a Feature Branch**

- When working on a new feature, bug fix, or hotfix, create a new branch with a descriptive name:
  - Use the prefix `feature/` for new features (e.g., `feature/user-login`).
  - Use the prefix `fix/` for bug fixes (e.g., `fix/button-styling`).
  - Use the prefix `hotfix/` for urgent fixes to production (e.g., `hotfix/critical-bug`).
- Keep branch names short and meaningful.

---

## **3. Commit Often and Clearly**

- Make small, focused commits that address a single change or task.
- Write clear commit messages in the present tense (e.g., "Add user login form" instead of "Added user login form").
- Avoid committing broken or untested code to your branch.

---

## **4. Open a Pull Request (PR) to `dev`**

- When your feature or fix is ready, open a PR to the `dev` branch.
- Provide a clear description of your changes in the PR:
  - What does this PR do?
  - How can it be tested?
  - Include screenshots or links if applicable.
- **Netlify Preview Deployment**: When you open a PR, a preview deployment will be automatically created. Use the provided URL to test your changes in a live environment.

---

## **5. Testing in `dev`**

- After your PR is merged into `dev`, your changes will be deployed to the main Netlify site for further testing.
- Test your changes thoroughly to ensure they work as expected.

---

## **6. Release to Production**

- When we’re ready to release new features or fixes to production:
  1. Create a PR from `dev` to `master`.
  2. Review the changes carefully.
  3. Merge the PR into `master`.
- **Production Deployment**: Once merged, the `master` branch will automatically deploy to GitHub Pages (our production site).

---

## **7. Update Dev From Master**

- After merging changes to `master`, it's essential to sync those changes back to `dev`:

```bash
   git checkout master
   git pull origin master
   git checkout dev
   git merge master
   git push origin dev
```

- If conflicts occur, resolve them carefully, commit, and push:

```bash
   # After resolving conflicts
   git add .
   git commit -m "Merge master into dev to sync branches"
   git push origin dev
```

- This workflow ensures that your `dev` branch always contains all the changes that are in `master`, plus any new development work, maintaining a clean forward path for future releases.

## **8. Keep Your Branch Updated**

- Regularly pull the latest changes from `dev` to keep your branch up to date:

```bash
  git checkout dev
  git pull origin dev
  git checkout your-branch
  git merge dev
```

- Resolve any merge conflicts that arise.

---

## **Best Practices**

- **Protect Branches**: Both `master` and `dev` are protected. Always use PRs to merge changes—no direct commits.
- **Code Reviews**: Review each other’s PRs to ensure code quality and share knowledge.
- **Test Locally**: Before opening a PR, test your changes locally to avoid breaking the build.
- **Communicate**: If you’re unsure about anything, ask for help or clarification.

---

## **Workflow Summary**

1. Branch from `dev`.
2. Work on your feature/fix in a new branch.
3. Open a PR to `dev` for review and testing.
4. Merge to `dev` and test on Netlify.
5. When ready, create a PR from `dev` to `master` for production deployment to GitHub Pages.

---

### **Example Workflow**

1. Create a new branch:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/user-login
   ```

2. Make changes and commit:

   ```bash
   git add .
   git commit -m "Add user login form"
   ```

3. Push your branch and open a PR:

   ```bash
   git push origin feature/user-login
   ```

4. After PR approval and merging, test on Netlify.
5. When ready, create a PR from `dev` to `master` for production.
