# fejk-cli [![fejk-cli](https://github.com/johnie/fejk-cli/actions/workflows/master.yml/badge.svg?branch=master)](https://github.com/johnie/fejk-cli/actions/workflows/master.yml)

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
