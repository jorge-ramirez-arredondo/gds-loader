const loaderUtils = require("loader-utils");
const gdsParser = require("@jorge-ramirez-arredondo/gds-parser");
const gdsGenerator = require("@jorge-ramirez-arredondo/gds-instructions-generator");

const GDS_INTERPRETER_MODULE = `"@jorge-ramirez-arredondo/gds-instructions-interpreter"`;

function gdsLoader(source) {
	const ast = gdsParser.parse(source);
	const instructions = gdsGenerator(ast);

	/*
		GDSInstructionInterpreter required and instantiated all in one line to
		avoid possible scope conflicts with instructions.
	*/
	return `
		module.exports = new (require(${GDS_INTERPRETER_MODULE}))(${instructions});
	`;
}

module.exports = gdsLoader;
