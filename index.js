const MAX_SP = 350000;
const MAX_AC = 500000;
const MAX_DC = 500000;
const MAX_PA = 1100000;
const MAX_WT = 10000;
let pa = 0;

const EXAMPLE_SCRIPT = `
#SPRTNS
OE 1
ER 32000
WT 6000 // Wait (ms)

cnt=1
#NEXT
SP 250000 // Set speed (max 350,000)
AC 800000 // Set acceleration (max 500,000)
DC 800000 // Set deceleration (max 500,000)

SP 250000
PA 1100000 // Position (max 1,100,000)
BGA
AMA
WT 5000`;

const START_BLOCK = `
#SPRTNS
OE 1
ER 32000
WT 6000 
`;

const CONSTRAINTS = {
  SP: {
    max: MAX_SP,
    min: 0,
  },
  AC: {
    max: MAX_AC,
    min: 1000,
  },
  DC: {
    max: MAX_DC,
    min: 1000,
  },
  PA: {
    max: MAX_PA,
    min: 10000,
  },
  WT: {
    max: MAX_WT,
    min: 0,
  },
};

/**
 * validates the input params for a movement block.
 * @param {*} inputs an object of shape { SP, AC, DC, PA, WT }
 */
const validateMovementBlockInput = (inputs) => {
  let isValid = true;
  for (const inputKey in inputs) {
    const val = inputs[inputKey];
    const { max, min } = CONSTRAINTS[inputKey];
    if (val < min || val > max) {
      isValid = false;
      console.log(`Invalid input ${inputKey}: ${val}`);
    }
  }
};

/**
 * Creates a movement block based on the passed in inputs.
 * @param {number} SP - Speed to move. 1000 to 350,000
 * @param {number} AC - Acceleration. 1000 to 500,000
 * @param {number} DC - Deceleration. 1000 to 500,000
 * @param {number} unitsToMove positive for forwards, negative for backwards. current pos + unitsToMove must = 10000 to 1,100,000
 * @param {number} WT - Time to wait after moveing (ms). 0 to 10000
 * @returns {string}
 */
const createMovementBlock = (SP, AC, DC, unitsToMove, WT = 0) => {
  const newPa = pa + unitsToMove;
  if (!validateMovementBlockInput({ SP, AC, DC, PA: newPa, WT })) return;
  const movementBlock = `
SP ${SP} 
AC ${AC} 
DC ${DC} 
PA ${newPa}
WT ${WT}
    `;

  return movementBlock;
};

const main = () => {
  let script = `
    ${START_BLOCK}
    
    `;
};

main();
