"use strict";

var CssGenerator = new Blockly.Generator("CSS");

CssGenerator.ORDER_ATOMIC = 0;
CssGenerator.ORDER_NONE = 0;

CssGenerator.init = function (workspace) {};
CssGenerator.finish = function (code) {
  return code;
};

CssGenerator.scrub_ = function (block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = CssGenerator.blockToCode(nextBlock);
  return code + nextCode;
};

// CSS Rule Generator
CssGenerator["css_rule"] = function (block) {
  var selector = block.getFieldValue("SELECTOR");
  var declarations = CssGenerator.statementToCode(block, "DECLARATIONS");

  // Format with proper indentation
  var code = selector + " {\n" + declarations + "}\n\n";
  return code;
};

// CSS Declaration Generator
CssGenerator["css_declaration"] = function (block) {
  var property = block.getFieldValue("PROPERTY");
  var value =
    CssGenerator.valueToCode(block, "VALUE", CssGenerator.ORDER_ATOMIC) || "";

  // Remove quotes if they exist (from text inputs)
  value = value.replace(/^['"]|['"]$/g, "");

  // Handle numeric values (like from css_size block)
  if (typeof value === "number") {
    value = value.toString();
  }

  return "  " + property + ": " + value + ";\n";
};

// CSS Color Value Generator
CssGenerator["css_color"] = function (block) {
  var color = block.getFieldValue("VALUE");
  return [color, CssGenerator.ORDER_ATOMIC];
};

// CSS Size Value Generator
CssGenerator["css_size"] = function (block) {
  var value =
    CssGenerator.valueToCode(block, "NUM", CssGenerator.ORDER_ATOMIC) || 0;
  var unit = block.getFieldValue("UNIT");

  // Ensure numeric values
  if (isNaN(value)) value = 0;

  return [value + unit, CssGenerator.ORDER_ATOMIC];
};

// CSS Flex Container Generator
CssGenerator["css_flex_container"] = function (block) {
  var properties = CssGenerator.statementToCode(block, "PROPERTIES");

  // Default flex properties if none specified
  if (!properties.trim()) {
    properties = "  display: flex;\n  flex-direction: row;\n";
  }

  return ".flex-container {\n" + properties + "}\n\n";
};

// Helper function for style attribute generation
CssGenerator.generateStyleAttribute = function (properties) {
  // Remove extra whitespace and semicolons
  return properties.replace(/\s+/g, " ").replace(/;\s*/g, "; ").trim();
};
