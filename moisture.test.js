const moistureContent = require('./moisture')
const moisture = new moistureContent("MT001", 2859.6, 300, 2525.7, "01BAL")
const tareGreaterThanWetDry = new moistureContent("MT001", 2859.6, 3000, 2525.7, "01BAL")

// test that we can return an object, this will make sure that when all inputs are valid the output is also valid 
test("test that we can return an object", () => {
    expect(typeof moisture).toBe(typeof {})
})

// test if the dry/wet mass calculation are correct 
test("Material Wet Mass calculation", () => {
    expect(moisture.materialDryMassCalucation()).toEqual(2225.7)

})

test("Material dry Mass calculation", () => {
    expect(moisture.materialWetMassCalucation()).toEqual(2559.6)
})
// test if water content can be accuratly calculated
test("Water Content calculation", () => {
    expect(moisture.waterContentCalucation()).toEqual(15)
})

// test for the cases where Tare mass is greater than Tare and Material Wet/Dry Mass
test("Tare Mass is larger than Tare and Material Wet Mass", () => {
    expect(tareGreaterThanWetDry.materialWetMassCalucation()).toEqual(false)
})

test("Tare Mass is larger than Tare and Material dry Mass", () => {
    expect(tareGreaterThanWetDry.materialDryMassCalucation()).toEqual(false)
})
// final catch-all if one of the calculations returns false 
test("Ensure validation will not return object if calculation is not functional", () => {
    expect(tareGreaterThanWetDry.valueValidation()).toEqual(false)
})

// catch Dry mass greater than wet mass
test("ensure wet mass is greater than dry", () =>{
    const waterContentTest = new moistureContent("MT001", 2859.6, 300, 90000, "01BAL");
    expect(waterContentTest.waterContentCalucation()).toEqual(false)
})

// catch Dry mass greater than wet mass
test("ensure the tare ID is within character limit bounds", () =>{
    const tareIDTest = new moistureContent("9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999", 2859.6, 300, 2525.4, "01BAL");
    expect(tareIDTest.valueValidation()).toEqual(false)
})

// catch Dry mass greater than wet mass
test("Mass can not be less than 0", () =>{
    const waterContentTest = new moistureContent("MT001", -2859.6, -300, -2525.7, "01BAL");
    expect(waterContentTest.valueValidation()).toEqual(false)
})



// not 100% sure hot to test a console.log
// test("Tare mass must be greater than 0 warning", () =>{
//     const waterContentTest = new moistureContent("MT001", 2859.6, 0, 2525.7, "01BAL");
//     expect(waterContentTest.valueValidation()
//     ).toHaveBeenCalledWith(
//         'Warning: Tare mass is expected, a missing or 0 tare mass may indicate an issue with the result'
//       )
// })
