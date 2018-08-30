# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.5] - 2018-09-07
### Added
- Introduced Compose as beta

## [0.2.1] - 2018-07-28
### Changed
- Fix propagation a bug of ObjectWrapper which blocks property propagation

## [0.2.0] - 2018-07-28
### Changed
- [breaking change] Changed 'watch' of ObjectWatcher from prop to param because it may cause unintuitive behavior if an element is used in multiple locations in vdom.

## [0.1.4] - 2018-07-22
### Changed
- Fix commit miss.

## [0.1.3] - 2018-07-22
### Changed
- Allow watch of ObjectWatcher can be string[].

## [0.1.2] - 2018-07-22
### Changed
- Remove initialProps from further props of AsyncResolver and DebouncePropagator

## [0.1.1] - 2018-07-21
### Added
- More unit tests.

### Changed
- AsyncResolver: initialProps now propagates before subjest is resolved.
- DebouncePropagator: initialProps is now required and propagates before subject is resolved.

## [0.1.0] - 2018-07-21
### Added
- Unit tests.
- CircleCI

### Changed
- Update readme.

## [0.0.9] - 2018-07-20
### Changed
- Change the behavior of ObjectWrapper so that object instance be shared among different tags.
