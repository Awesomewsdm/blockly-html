const CSS_BLOCKS = [
  // CSS Rule Block
  {
    type: 'css_rule',
    message0: 'Style for %1 %2',
    args0: [
      {
        type: 'field_input',
        name: 'SELECTOR',
        text: '.my-class'
      },
      { type: 'input_dummy' }
    ],
    message1: 'properties %1',
    args1: [
      {
        type: 'input_statement',
        name: 'DECLARATIONS',
        check: 'css_declaration'
      }
    ],
    previousStatement: 'css_rule',
    nextStatement: 'css_rule',
    colour: 230,
    tooltip: 'A complete CSS rule with selector and declarations',
    helpUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax'
  },

  // CSS Declaration Block
  {
    type: 'css_declaration',
    message0: '%1: %2;',
    args0: [
      {
        type: 'field_dropdown',
        name: 'PROPERTY',
        options: [
          ['color', 'color'],
          ['background-color', 'background-color'],
          ['font-size', 'font-size'],
          ['margin', 'margin'],
          ['padding', 'padding'],
          ['border', 'border'],
          ['display', 'display'],
          ['flex-direction', 'flex-direction']
        ]
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: ['css_value', 'text']
      }
    ],
    inputsInline: true,
    previousStatement: 'css_declaration',
    nextStatement: 'css_declaration',
    colour: 210,
    extensions: ['declaration_tooltip']
  },

  // CSS Color Value Block
  {
    type: 'css_color',
    message0: 'color %1',
    args0: [
      {
        type: 'field_colour',
        name: 'VALUE',
        colour: '#ff0000',
        colourOptions: [
          '#ff0000', '#00ff00', '#0000ff',
          '#ff9900', '#ff00ff', '#00ffff',
          '#ffffff', '#999999', '#000000'
        ]
      }
    ],
    output: 'css_value',
    colour: 190,
    tooltip: 'Select a color value'
  },

  // CSS Size Value Block
  {
    type: 'css_size',
    message0: 'size %1 %2',
    args0: [
      {
        type: 'field_number',
        name: 'VALUE',
        value: 16,
        min: 0,
        precision: 1
      },
      {
        type: 'field_dropdown',
        name: 'UNIT',
        options: [
          ['px', 'px'],
          ['em', 'em'],
          ['rem', 'rem'],
          ['%', '%'],
          ['vh', 'vh'],
          ['vw', 'vw']
        ]
      }
    ],
    output: 'css_value',
    colour: 180,
    tooltip: 'Numeric value with CSS unit'
  },

  // CSS Flex Container Block
  {
    type: 'css_flex_container',
    message0: 'flex container %1',
    args0: [
      {
        type: 'input_dummy'
      }
    ],
    message1: 'properties %1',
    args1: [
      {
        type: 'input_statement',
        name: 'PROPERTIES',
        check: 'css_declaration'
      }
    ],
    previousStatement: 'css_rule',
    nextStatement: 'css_rule',
    colour: 220,
    tooltip: 'Creates a flexbox container with common properties',
    extensions: ['flex_presets']
  }
];

// Register all blocks
CSS_BLOCKS.forEach(blockDef => {
  Blockly.Blocks[blockDef.type] = {
    init: function() {
      this.jsonInit(blockDef);
      
      // Add custom extensions if defined
      if (blockDef.extensions) {
        blockDef.extensions.forEach(ext => {
          if (Blockly.Extensions[ext]) {
            Blockly.Extensions.apply(ext, this);
          }
        });
      }
    }
  };
});

// Custom Extensions
Blockly.Extensions.register('declaration_tooltip', function() {
  this.setTooltip(function() {
    const prop = this.getFieldValue('PROPERTY');
    return `CSS property: ${prop}\nSee MDN docs: https://developer.mozilla.org/en-US/docs/Web/CSS/${prop}`;
  });
});

Blockly.Extensions.register('flex_presets', function() {
  this.setOnChange(function(event) {
    if (event.type === Blockly.Events.BLOCK_CREATE) {
      // Auto-add common flex properties
      const props = [
        { property: 'display', value: 'flex' },
        { property: 'gap', value: '10px' }
      ];
      
      props.forEach(prop => {
        const block = this.workspace.newBlock('css_declaration');
        block.setFieldValue(prop.property, 'PROPERTY');
        // Value setting logic here...
        this.getInput('PROPERTIES').connection.connect(block.previousConnection);
      });
    }
  });
});