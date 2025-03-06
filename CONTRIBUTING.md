# CONTRIBUTING

Here's how our git workflow works:

1. **Start with Dev**: Always create new branches from dev branch, which has the latest working code.
2. **Create Feature Branches**: When working on something new, create a branch with a descriptive name and prefix like `feature/your-feature-name`, or `fix/**` or `hotfix/**`.
3. **Commit Often**: Make small, focused commits with clear messages.
4. **Open a PR to Dev**: When your feature is ready, open a PR to the dev branch.
   Our system will create a Netlify preview deployment so we can see your changes live.
5. **Testing in Dev**: After merging to dev, you can test the new features on our Netlify site.
6. **Release to Production**: When we're ready to release, we create a PR from dev to master.
   This deploys to our production GitHub Pages site.
7. **Keep Updated**: Regularly pull from dev to get the latest changes.
