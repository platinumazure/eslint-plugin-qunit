# Release Instructions

1. `git pull` the latest commits in the `main` branch and ensure that `git status` shows no local changes

2. `export GITHUB_TOKEN="..."` with a [GitHub access token](https://github.com/settings/tokens/new?scopes=repo&description=release-it) with "repo" access so [release-it](https://github.com/release-it/release-it) can conduct a GitHub release

3. `export EDITOR="vim"` to choose an editor for editing the changelog

4. `npm run release` (uses [@release-it-plugins/conventional-changelog](https://github.com/release-it/conventional-changelog) to handle versioning, the changelog, publishing to GitHub and NPM, etc)
