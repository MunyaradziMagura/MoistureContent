/* required fields
measurements: ID, Tare Mass, Tare and Material Wet Mass RETURNS material wet mass
Dry mass: dryMassBal, MCDS RETURNS Material Dry Mass
results: RETURNS wet content
*/

/* justification & Assumptions 
  im assuming the default water content within soil & rock is 0, 
    as to limit the influence of water content on other calculations in the future
*/

// INITILISER VARIBLES

// unite Grams
const initalMC = 0; // Tare Mass
const initialMCMS = 0; // Tare and Material Wet Mass
const initialMCDS = 0; // Tare and Material Dry Mass

// Unite: string
const initialTareID = "null"; // Tare ID
const initialDryMassBal = "null"; // Dry Mass Balance

// comparason varibles
const tareIDMinLength = 0;
const tareIDMaxLength = 20;

class moistureContent {
  constructor(
    _tareID = initialTareID,
    _MCMS = initialMCMS,
    _MC = initalMC,
    _MCDS = initialMCDS,
    _dryMassBal = initialDryMassBal
  ) {
    this.tareID = _tareID;
    this.MC = _MC;
    this.dryMassBal = _dryMassBal;
    this.MCMS = _MCMS;
    this.MCDS = _MCDS;
  }

  // calculates Material Wet Mass & returns material wet mass (MMS)
  materialWetMassCalucation() {

    //  Tare and wet mass must be greater than tare mass
    if (this.MC >= this.MCMS) {
      console.log("Danger: Tare and wet mass must be greater than tare mass")
      return false
    }

    const result = this.MCMS - this.MC;
    // console.log(`${this.tareID} has a Meterial Wet Mass (g) of : ${result}g`);
    return result;
  }

  // calculates Material Dry Mass
  materialDryMassCalucation() {

    // Tare mass is {greater than/equal to} tare and dry material mass
    if (this.MC >= this.MCDS) {
      console.log("Danger: Tare mass is {greater than/equal to} tare and dry material mass, cannot calculate a result (select appropriate language depending on equality)")
      return false
    }

    const result = this.MCDS - this.MC;
    // console.log(
    //   `${this.dryMassBal} has a Meterial dry Mass (g) of : ${result}g`
    // );
    return result;
  }

  // calculates Water Content
  waterContentCalucation() {
    // Dry mass greater than wet mass
    if (this.MCDS > this.MCMS) {
      console.log("Danger: Dry mass greater than wet mass, cannot calculate a result")
      return false
    }

    // used toFixed to only obtain the last two decimal places
    const result = (
      ((this.MCMS - this.MCDS) / (this.MCDS - this.MC)) *
      100
    ).toFixed(2);
    // console.log(`Water Content is at : ${result}%`);
    return parseFloat(result);
  }

  // validate values
  valueValidation() {

    // chech that the calculations are valid  i.e. there are no errors 
    if (this.materialWetMassCalucation() == false || this.materialDryMassCalucation() == false || this.waterContentCalucation() == false) return false  

    // check that Tare ID is longer than 6 characters and shorter than 20
    if (
      this.tareID.length < tareIDMinLength |
      this.tareID.length > tareIDMaxLength
    ) {
      console.log(
        `Tare ID length out of bounds. Tare ID length: ${this.tareID.length}, expected to be in the rage of ${tareIDMinLength} & ${tareIDMaxLength}`
      );
      return false;
    }

    // mass can not be less than 0
    if (this.MC < 0 | this.MCMS < 0 | this.MCDS < 0) {
      console.log("Danger: Mass cannot be less than 0")
      return false
    }

    // if Tare mass is blank or 0 console warning, app will not break
    if (this.MC <= 0) console.log("Warning: Tare mass is expected, a missing or 0 tare mass may indicate an issue with the result")


    // construct an object to store moisture content
    const moistureContentObj = {
      tareID: this.tareID,
      MC: this.MC,
      MCMS: this.MCMS,
      materialWetMass: this.materialWetMassCalucation(),
      dryMassBalance: this.dryMassBal,
      MCDS: this.MCDS,
      materialDryMass: this.materialDryMassCalucation(),
      "waterContent (%)": this.waterContentCalucation(),
    };
    return moistureContentObj;
  }
}

// preform calculations
const moister = new moistureContent("MT001", 2859.6, 0, 2525.7, "01BAL");
console.log(moister.valueValidation())


// export class for testing 
module.exports = moistureContent