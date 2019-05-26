# fejk-cli [![Build Status](https://travis-ci.org/johnie/fejk-cli.svg?branch=master)](https://travis-ci.org/johnie/fejk-cli)

> Reverse engineered cli and package for [fejk.se](https://fejk.se)

## Install

### Package

```
$ npm install --save fejk-cli
```

### CLI

```
$ npm install --global fejk-cli
```

## Usage

```
	Usage
	  $ fejk …
	Options
		--table:default get fejk data in a table format
		--raw get fejk data in a raw json format
		--key get specific key form fejk data
		  --copy get the key value copied to the cliboard
	Examples
		$ fejk --raw
		$ fejk --key=mail --copy
```

## License

MIT © [Johnie Hjelm](https://johnie.se)
