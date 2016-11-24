# eslint-plugin-qunit
[![Build Status](https://travis-ci.org/platinumazure/eslint-plugin-qunit.svg?branch=master)](https://travis-ci.org/platinumazure/eslint-plugin-qunit)
[![Coverage Status](https://coveralls.io/repos/platinumazure/eslint-plugin-qunit/badge.svg?branch=master&service=github)](https://coveralls.io/github/platinumazure/eslint-plugin-qunit?branch=master)
[![devDependency Status](https://david-dm.org/platinumazure/eslint-plugin-qunit/dev-status.svg)](https://david-dm.org/platinumazure/eslint-plugin-qunit#info=devDependencies)
[![Join the chat at https://gitter.im/platinumazure/eslint-plugin-qunit](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/platinumazure/eslint-plugin-qunit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat)](#contributors)

ESLint plugin containing rules useful for QUnit tests.

## Available Rules

Below is the list of rules available in this plugin.

* [assert-args](docs/rules/assert-args.md)
* [literal-compare-order](docs/rules/literal-compare-order.md)
* [no-arrow-tests](docs/rules/no-arrow-tests.md)
* [no-assert-equal](docs/rules/no-assert-equal.md)
* [no-assert-logical-expression](docs/rules/no-assert-logical-expression.md)
* [no-async-in-loops](docs/rules/no-async-in-loops.md)
* [no-async-test](docs/rules/no-async-test.md)
* [no-commented-tests](docs/rules/no-commented-tests.md)
* [no-compare-relation-boolean](docs/rules/no-compare-relation-boolean.md)
* [no-conditional-assertions](docs/rules/no-conditional-assertions.md)
* [no-early-return](docs/rules/no-early-return.md)
* [no-global-assertions](docs/rules/no-global-assertions.md)
* [no-global-expect](docs/rules/no-global-expect.md)
* [no-global-module-test](docs/rules/no-global-module-test.md)
* [no-global-stop-start](docs/rules/no-global-stop-start.md)
* [no-init](docs/rules/no-init.md)
* [no-jsdump](docs/rules/no-jsdump.md)
* [no-negated-ok](docs/rules/no-negated-ok.md)
* [no-ok-equality](docs/rules/no-ok-equality.md)
* [no-only](docs/rules/no-only.md)
* [no-qunit-push](docs/rules/no-qunit-push.md)
* [no-qunit-start-in-tests](docs/rules/no-qunit-start-in-tests.md)
* [no-qunit-stop](docs/rules/no-qunit-stop.md)
* [no-reassign-log-callbacks](docs/rules/no-reassign-log-callbacks.md)
* [no-reset](docs/rules/no-reset.md)
* [no-setup-teardown](docs/rules/no-setup-teardown.md)
* [no-test-expect-argument](docs/rules/no-test-expect-argument.md)
* [no-throws-string](docs/rules/no-throws-string.md)
* [require-expect](docs/rules/require-expect.md)
* [resolve-async](docs/rules/resolve-async.md)

## Available Configurations

You can extend from these configurations in order to simplify manual configuration of plugin rules in your project.

For more details on how to extend your configuration from one or both of these plugin configurations, please see the [ESLint plugin configuration documentation](http://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin).

### recommended

This configuration includes rules which I recommend to avoid QUnit runtime errors or incorrect behavior, some of which can be difficult to debug. Some of these rules also encourage best practices that help QUnit work better for you.

You can use this configuration by extending from `"plugin:qunit/recommended"` in your configuration file.

Rules included in `qunit/recommended` configuration:

* `assert-args`
* `literal-compare-order`
* `no-async-in-loops`
* `no-commented-tests`
* `no-ok-equality`
* `no-only`
* `no-reassign-log-callbacks`
* `no-reset`
* `no-throws-string`
* `require-expect` (using "except-simple" configuration)
* `resolve-async`

### two

This configuration includes rules which are useful for avoiding runtime errors or unexpected behavior in QUnit 2.0.

You can use this configuration by extending from `"plugin:qunit/two"` in your configuration file.

Rules included in `qunit/two` configuration:

* `no-async-test`
* `no-global-assertions`
* `no-global-expect`
* `no-global-module-test`
* `no-global-stop-start`
* `no-init`
* `no-jsdump`
* `no-qunit-push`
* `no-qunit-stop`
* `no-reassign-log-callbacks`
* `no-reset`
* `no-setup-teardown`
* `no-test-expect-argument`
* `no-throws-string`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/284282?v=3" width="100px;"/><br /><sub>Kevin Partington</sub>](http://github.com/platinumazure)<br />[💻](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=platinumazure) [📖](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=platinumazure) [⚠️](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=platinumazure) [🐛](https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Aplatinumazure) 💡 👀 | [<img src="https://avatars.githubusercontent.com/u/162735?v=3" width="100px;"/><br /><sub>Jordan Eldredge</sub>](https://jordaneldredge.com)<br />[⚠️](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=captbaritone) 💁 | [<img src="https://avatars.githubusercontent.com/u/15169?v=3" width="100px;"/><br /><sub>Mitch Lloyd</sub>](https://github.com/mitchlloyd)<br />[💻](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=mitchlloyd) [📖](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=mitchlloyd) [⚠️](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=mitchlloyd) | [<img src="https://avatars.githubusercontent.com/u/6665906?v=3" width="100px;"/><br /><sub>John Mainz</sub>](https://github.com/jmainz)<br />[⚠️](https://github.com/platinumazure/eslint-plugin-qunit/commits?author=jmainz) [🐛](https://github.com/platinumazure/eslint-plugin-qunit/issues?q=author%3Ajmainz) |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Semantic Versioning Policy

Like ESLint itself, this ESLint plugin follows [semantic versioning](http://semver.org). However, due to the nature of ESLint as a code quality tool, it's not always clear when a minor or major version bump occurs. To help clarify this for everyone, we've defined the following semantic versioning policy, based on the policy used by ESLint:

* Patch release (intended not to break your lint build)
    * A bug fix in a plugin rule that results in ESLint reporting fewer errors.
    * Improvements to documentation.
    * Non-user-facing changes such as refactoring code; adding, deleting, or modifying tests; and increasing test coverage.
    * Re-releasing after a failed release (i.e., after having published a release that doesn't work for anyone).
* Minor release (might break your lint build)
    * A bug fix in a rule that results in ESLint reporting more errors.
    * A new rule is created (without being added to plugin configuration).
    * A new option to an existing rule is created (without any default options changing).
    * A new plugin configuration is created.
    * An existing rule is deprecated.
* Major release (likely to break your lint build)
    * An existing plugin configuration is changed in any way, including but not limited to:
        * A new rule is added to the configuration.
        * A rule is removed from the configuration.
        * The options used in configuration for a rule are changed
    * An existing rule is removed.
    * A backward-incompatible change is made to the options of a rule.
