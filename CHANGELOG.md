### 4.3.0
* Upgrade: Bump lodash from 4.17.11 to 4.17.19 (#91) (dependabot[bot])
* New no-loose-assertions rule. (#80) (ventuno)
* Chore: Use outdent for multiline test cases (#89) (Ed S)
* Update: Add a fixer for no-arrow-tests (#88) (Ed S)
* Docs: Remove unsupported all-contributors badge (Kevin Partington)

### 4.2.0
* Fix: literal-compare-order crash on BDD-style assertions (fixes #74) (Kevin Partington)
* Chore: Add eslint-plugin-eslint-plugin devDependency (fixes #85) (Kevin Partington)
* New rule: no-skip (#81) (Steve Calvert)

### 4.1.0
* Docs: Add more contributors (Kevin Partington)
* Upgrade: Bump acorn from 6.3.0 to 6.4.1 (#83) (dependabot[bot])
* Upgrade: Bump eslint-utils from 1.3.1 to 1.4.3 (#82) (dependabot[bot])
* Docs: Add contributors (Kevin Partington)
* Fix: require-expect handles implicit body arrow functions correctly (fixes #76) (Kevin Partington)
* Chore: Improve unit test (Kevin Partington)
* Build: Add Node 12, 13, and 14 to Travis config (Kevin Partington)
* Upgrade: Upgrade devDependencies (semver-minor only) (Kevin Partington)
* Build: Add package-lock.json (Kevin Partington)
* New: Implement new rule `no-assert-ok` (#78) (ventuno)
* Update: Improve no-only rule to detect only() module.only() and QUnit.module.only() (#73) (Brad Overton)
* Fix: Fix typo in no-test-expect-argument (#71) (Ed S)

### 4.0.0
* Upgrade: coveralls, eslint, nyc, semver to latest (Kevin Partington)
* Chore: Convert all rules to use messageIds (Kevin Partington)
* Breaking: Drop support for Node 4/7/9 and ESLint <4.15 (Kevin Partington)

### 3.3.1
* Chore: Declare compatibility with eslint@5.x (Kevin Partington)
* Chore: Upgrade devDependencies (Kevin Partington)
* Chore: Removing unused eslint disable comments (Kevin Partington)

### 3.3.0
* Chore: Disable package-lock (Kevin Partington)
* Chore: Add support/testing for Node 10 (Kevin Partington)
* New: "never" and "never-except-zero" options for require-expect rule (#70) (Timo Tijhof)
* Chore: Test with Node 8 and 9 (Kevin Partington)
* Chore: Switch to nyc for unit tests and code coverage (Kevin Partington)

### 3.2.1
* Upgrade: devDependencies (Kevin Partington)
* Docs: Add Krinkle to all-contributors (Kevin Partington)
* Docs: Fix heading syntax for no-assert-equal (#66) (Timo Tijhof)

### 3.2.0
* Chore: ESLint peerDependency expanded to >=3.18.0 <5.0.0 (Kevin Partington)
* Fix: no-commented-tests does not warn on shebang comments (Kevin Partington)
* Chore: Upgrade devDependencies, including eslint@4.x (Kevin Partington)
* Chore: Use sourceCode.getAllComments() in no-commented-tests (fixes #64) (Kevin Partington)

### 3.1.0
* Docs: Updating config rule lists in README to match reality (fixes #60) (Kevin Partington)
* Docs: Adding ntwb to contributor list (Kevin Partington)
* Update: no-identical-names message references line number (fixes #62) (Kevin Partington)

### 3.0.0
* Update: Using ESLint AST selectors in some rules (fixes #59) (Kevin Partington)
* Breaking: Updating eslint peerDependency to >=3.18.0 (refs #59) (Kevin Partington)
* Upgrade: devDependencies to latest version (Kevin Partington)
* Chore: Enable template-curly-spacing ESLint rule (fixes #54) (Kevin Partington)
* Chore: Enable prefer-template ESLint rule (refs #54) (Kevin Partington)
* Chore: Enable prefer-const ESLint rule (refs #54) (Kevin Partington)
* Chore: Enabling no-const-assign ESLint rule (refs #54) (Kevin Partington)
* Chore: Enable no-var ESLint rule (refs #54) (Kevin Partington)
* Chore: Fix whitespace in ESLint configuration (Kevin Partington)
* Chore: Consume eslint-plugin-node (Kevin Partington)
* Breaking: engines set in package.json (node >=4.0.0) (Kevin Partington)
* Breaking: Updating exported configs (fixes #52, fixes #58) (Kevin Partington)
* Chore: Ensuring rules etc. are sorted in index.js (Kevin Partington)
* Docs: Fixing indentation in no-qunit-start-in-tests docs (fixes #55) (Kevin Partington)

### 2.4.0
* Docs: Fixing indentation in no-qunit-start-in-tests docs (Kevin Partington)
* Docs: Add Turbo87 to project contributor list (Kevin Partington)
* New: Add "no-identical-names" rule (fixes #56) (#57) (Tobias Bieniek)

### 2.3.0
* Chore: Ensure .md files have LF line endings (Kevin Partington)
* Chore: Updating Travis config, dropping Node 5 and adding Node 7 (Kevin Partington)
* Chore: Enabling ESLint rule no-useless-return (Kevin Partington)
* New: no-qunit-start-in-tests rule (fixes #51) (Kevin Partington)
* Upgrade: eslint@~3.10.2, fixing resulting lint error (Kevin Partington)
* Upgrade: eslint@^3.8.1, adding some new rules (Kevin Partington)
* New: no-conditional-assertions rule (fixes #46) (Kevin Partington)
* Fix: README rules links no longer use dot prefix (fixes #53) (Kevin Partington)

### 2.2.0
* Build: Fixed extraneous output in generate-release-changelog (Kevin Partington)
* New: no-assert-logical-expression rule (fixes #50) (Kevin Partington)
* Fix: no-early-return crash when return statement was outside test (Kevin Partington)
* Fix: no-early-return handles nested scopes (fixes #48) (Kevin Partington)
* Docs: Add limitations section to assert-args docs (fixes #49) (Kevin Partington)

### 2.1.1
* Fix: no-throws-string exception (fixes #47) (Kevin Partington)

### 2.1.0
* Fix: Added missing test case to no-early-return (Kevin Partington)
* Chore: Allowing ESLint ^2.8.0 or 3.x as peer dependency (fixes #45) (Kevin Partington)
* New: no-early-return rule (fixes #27) (Kevin Partington)

### 2.0.1
* Docs: Add no-throws-string to qunit/two, qunit/recommended in README (Kevin Partington)
* Build: Removing iojs from .travis.yml (Kevin Partington)

### 2.0.0
* Breaking: Adding no-throws-string to qunit/two and qunit/recommended (Kevin Partington)
* Upgrade: devDependencies to latest. (Kevin Partington)

### 1.1.0
* Docs: Using flat shields.io badge for "all contributors" (Kevin Partington)
* New: no-throws-string rule (fixes #43) (Kevin Partington)
* New: no-compare-relation-boolean rule (fixes #17) (Kevin Partington)
* Docs: Added semver policy to README (fixes #42) (Kevin Partington)

### 1.0.0
* Docs: Clarify how to extend plugin configuration in README (#41) (Kevin Partington)
* Docs: Update README with info about shareable configs (fixes #39) (Kevin Partington)
* New: no-test-expect-argument rule (fixes #40) (Kevin Partington)

### 1.0.0-rc0
* New: Added shareable configs "two" and "recommended" (fixes #33) (Kevin Partington)
* Breaking: Removing rulesConfig from plugin exports (Kevin Partington)
* Chore: Transformed rules into new-style ESLint rules (fixes #34) (Kevin Partington)
* Chore: Update peerDependency: eslint@^2.8.0 (fixes #32) (Kevin Partington)
* Fix: require-expect only report one error per test (fixes: #35) (Mitch Lloyd)

### 0.9.1
* Build: Fix generate-release-changelog after removing shelljs global (Kevin Partington)
* Build: Using double quotes to escape test exclusion glob (Kevin Partington)
* Build: Quote excluded fileset pattern for istanbul (#37) (Mitch Lloyd)
* Build: Dropping Node 0.12 and adding Node 6 to .travis.yml (Kevin Partington)
* Build: Require Unix-style line endings (Kevin Partington)
* Build: Ensuring LF is used in the repository via .gitattributes (Kevin Partington)
* Docs: Added captbaritone as a contributor (Kevin Partington)
* Docs: Adding Contributors section to README using all-contributors (Kevin Partington)
* Build: Upgrade ESLint to latest, add some new rules (Kevin Partington)
* Upgrade: coveralls, istanbul, mocha, shelljs to latest (Kevin Partington)
* Build: Tweaking npm script commands for readability (Kevin Partington)

### 0.9.0
* Fix: no-negated-ok checks negation depth before reporting (fixes #31) (Kevin Partington)
* Fix: no-negated-ok no longer flags global ok (fixes #30) (Kevin Partington)
* New: no-qunit-stop rule (fixes #20) (Kevin Partington)
* New: no-qunit-push rule (refs #20) (Kevin Partington)
* New: no-jsdump rule (refs #20) (Kevin Partington)
* New: no-reassign-log-callbacks rule (refs #20) (Kevin Partington)
* New: no-global-stop-start rule (refs #20) (Kevin Partington)
* New: no-init rule (refs #20) (Kevin Partington)

### 0.8.0
* Build: generate-release-changelog is now a version hook (Kevin Partington)
* New: no-reset rule (refs #20) (Kevin Partington)
* Fix: Adding rule schemas to rules which did not have schemas (Kevin Partington)
* New: no-setup-teardown rule (refs #20) (Kevin Partington)
* New: no-negated-ok rule (fixes #28) (Kevin Partington)
* Docs: Add Gitter badge (Kevin Partington)
* Upgrade: eslint@2.7.0, also added the new rules to .eslintrc.json (Kevin Partington)
* Docs: Adding rule summary to README. (Kevin Partington)
* New: no-global-expect rule (Kevin Partington)
* Build: Very basic test to check for rule documentation (Kevin Partington)

### 0.7.0
* Build: Add generate-release-changelog script as postversion hook (Kevin Partington)
* New: no-async-test rule (refs #20) (Kevin Partington)
* Docs: Fix header of no-global-module-test (Kevin Partington)
* Build: Ensure unit tests are run with all sources instrumented (Kevin Partington)
* New: no-global-module-test rule (refs #20) (Kevin Partington)
* Update: no-global-assertions doesn't need to track test context (Kevin Partington)
* Update: resolve-async now checks module hooks (fixes #4) (Kevin Partington)
* Docs: Removed merge commit from changelog (Kevin Partington)
* Docs: Update changelog for 0.6.0 (Kevin Partington)

### 0.6.0

* Upgrade: devDependencies to latest stable (Kevin Partington)
* New: no-arrow-tests rule (fixes #24) (Kevin Partington)
* New: require-expect rule (fixes #23) (Mitch Lloyd)
* Build: Updating .travis.yml (Kevin Partington)

### 0.5.0

* Build: Enable some ESLint rules available in eslint@2.0.0 (Kevin Partington)
* Upgrade: eslint@^2.2.0 (Kevin Partington)
* New: literal-compare-order rule (fixes #19) (Kevin Partington)
* Build: Enabling many ESLint rules. (Kevin Partington)
* Upgrade: eslint@^1.10.0 (Kevin Partington)

### 0.4.0

* New: no-global-assertions rule (refs #20) (Kevin Partington)
* Fix: MemberExpression properties no longer falsely flagged as assertions (Kevin Partington)
* Build: Adding no-undef and no-warning-comments to .eslintrc. (Kevin Partington)
* Fix: Avoid object prototype props being flagged as assertions in assert-args (Kevin Partington)
* Fix: assert-args allows any node type for message. (Kevin Partington)
* Fix: assert-args AssertionError if CallExpression found outside test (Kevin Partington)
* New: assert-args rule (fixes #10) (Kevin Partington)

### 0.3.1

* Fix: no-assert-equal assertion error fixed (fixes #16) (Kevin Partington)
* New: Unit tests for index.js to ensure rules are exported and configured (Kevin Partington)

### 0.3.0

* New: Adding rule no-only (fixes #11) (Kevin Partington)
* Fix: no-async-in-loops uses correct assert var in message (fixes #13) (Kevin Partington)
* New: no-assert-equal (fixes #8) (Kevin Partington)
* Update: Specifying eslint@>=1.3.0 as peerDepencency (Kevin Partington)

### 0.2.0

* Added default rule configuration for no-ok-equality. (Kevin Partington)
* New: Added rule no-commented-tests. (fixes #9) (Kevin Partington)
* Adding no-console and no-debugger rules to .eslintrc. (Kevin Partington)
* Update: Enhanced rule error messages for no-ok-equality. (fixes #7) (Kevin Partington)
* New: no-ok-equality rule. (refs #7) (Kevin Partington)
* Updating mocha-lcov-reporter devDependency. (Kevin Partington)
* Upgrading Mocha. (Kevin Partington)
* Upgrading some of the devDependencies. (Kevin Partington)
* Adding coveralls badge (Kevin Partington)
* Fixing typo (Kevin Partington)
* First attempt at Coveralls.io integration (Kevin Partington)

### 0.1.2-pre

* Adding build status and devDependency badges (Kevin Partington)
* Added docs (Kevin Partington)

### 0.1.1

* Removing private field from package.json (Kevin Partington)
* Adding preversion and postversion scripts (Kevin Partington)

### 0.1.1-pre

* Consuming ESLint 1.x and using included RuleTester (Kevin Partington)
* Removing before_install to attempt to fix possible version conflict (Kevin Partington)
* First pass at .travis.yml config. (Kevin Partington)
* Fixed logic error in start semaphore count handling. (Kevin Partington)
* no-async-in-loops now respects test's assertion context variable (Kevin Partington)
* Created utils module to improve code reusability. (Kevin Partington)
* Added rule no-async-in-loops. (Kevin Partington)
* Specifying files in package.json (Kevin Partington)
* Adding check-coverage script to npm test (Kevin Partington)
* One more test for full coverage. (Kevin Partington)
* Adding istanbul ignore comments where coverage is not needed on else branches. (Kevin Partington)
* Using istanbul cover instead of istanbul test. (Kevin Partington)
* Ensuring resolve-async respects stop()/start() semaphore delta argument. (Kevin Partington)
* Add support for assertion contexts declared as something besides "assert". (Kevin Partington)
* Defensive checks and tests around expressions which occur outside of test context. (Kevin Partington)
* Cleaning up stop()/start() error message for singular case. (Kevin Partington)
* Unit tests for multiple assert.async() callbacks. (Kevin Partington)
* More unit tests for multiple stop() calls. (Kevin Partington)
* Unit tests for QUnit.start/QUnit.stop. (Kevin Partington)
* Adding VariableDeclarator logic and more unit tests. (Kevin Partington)
* Added npm-debug.log to .gitignore (Kevin Partington)
* First pass at resolve-async rule. Needs more test coverage. (Kevin Partington)
* Adding eslint config files. (Kevin Partington)
* Added .gitignore file. (Kevin Partington)
* Adding package.json. (Kevin Partington)
* Initial commit (Kevin Partington)
