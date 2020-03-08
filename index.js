const loaderUtils = require("loader-utils");
const { gdsParser, gdsGenerator } = require("@jorge-ramirez-arredondo/game-dialog-script");

const GDS_MODULE = `"@jorge-ramirez-arredondo/game-dialog-script"`;

function gdsLoader(source) {
	const ast = gdsParser.parse(source);
	const instructions = gdsGenerator(ast);

	/*
		GDSInstructionInterpreter required and instantiated all in one line to
		avoid possible scope conflicts with instructions.
	*/
	return `
		module.exports = new require(${GDS_MODULE}).GDSInstructionInterpreter(${instructions});
	`;
}

module.exports = gdsLoader;
