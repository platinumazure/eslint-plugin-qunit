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
