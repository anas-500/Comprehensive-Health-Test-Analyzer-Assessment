/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "";


/* =========================================================
   USER ID
   =========================================================
   localStorage is used ONLY to keep the browser's user ID.
   Actual test data is stored in the Backend / Database.
   ========================================================= */

let userId = localStorage.getItem(
    "healthAnalyzerUserId"
);


if (!userId) {

    userId =
        "user-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 10);

    localStorage.setItem(
        "healthAnalyzerUserId",
        userId
    );
}


/* =========================================================
   SUMMARY VARIABLES
   ========================================================= */

let goodCount = 0;

let lowCount = 0;

let highCount = 0;

let warningCount = 0;

let trendChart = null;


/* =========================================================
   TEST DEFINITIONS
   =========================================================
   Common educational adult reference ranges.
   The user's own laboratory reference range should take
   priority because ranges vary between laboratories.
   ========================================================= */

const tests = [

    {
        id: "hemoglobin",
        name: "Hemoglobin",
        male: [13, 18],
        female: [11.5, 15.5],
        unit: "g/dL"
    },

    {
        id: "wbc",
        name: "WBC",
        low: 4.0,
        high: 11,
        unit: "×10³/µL"
    },

    {
        id: "rbc",
        name: "RBC",
        male: [4.2, 5.7],
        female: [4.10, 5.10],
        unit: "×10⁶/µL"
    },

    {
        id: "platelets",
        name: "Platelets",
        low: 150,
        high: 450,
        unit: "×10³/µL"
    },

    {
        id: "hematocrit",
        name: "Hematocrit",
        male: [40, 55],
        female: [35.0, 47.0],
        unit: "%"
    },

    {
        id: "mcv",
        name: "MCV",
        low: 79,
        high: 100,
        unit: "fL"
    },

    {
        id: "neutrophils",
        name: "Neutrophils",
        low: 40,
        high: 75,
        unit: "%"
    },

    {
        id: "lymphocytes",
        name: "Lymphocytes",
        low: 20,
        high: 40,
        unit: "%"
    },

    {
        id: "glucose",
        name: "Fasting Blood Glucose",
        low: 70,
        high: 105,
        unit: "mg/dL",
        special: "fastingGlucose"
    },

    {
        id: "totalCholesterol",
        name: "Total Cholesterol",
        low: 0,
        high: 199,
        unit: "mg/dL"
    },

    {
        id: "ldl",
        name: "LDL",
        low: 0,
        high: 130,
        unit: "mg/dL",
        special: "ldl"
    },

    {
        id: "hdl",
        name: "HDL",
        unit: "mg/dL",
        special: "hdl"
    },

    {
        id: "triglycerides",
        name: "Triglycerides",
        low: 0,
        high: 149,
        unit: "mg/dL"
    },

    {
        id: "creatinine",
        name: "Creatinine",
        male: [0.74, 1.35],
        female: [0.59, 0.90],
        unit: "mg/dL"
    },

    {
        id: "bun",
        name: "BUN",
        low: 6,
        high: 20,
        unit: "mg/dL"
    },

    {
        id: "egfr",
        name: "eGFR",
        low: 90,
        high: Infinity,
        unit: "mL/min/1.73m²",
        special: "egfr"
    },

    {
        id: "uricAcid",
        name: "Uric Acid",
        male: [3.5, 7.2],
        female: [2.4, 5.7],
        unit: "mg/dL"
    },

    {
        id: "alt",
        name: "ALT",
        low: 4,
        high: 34,
        unit: "U/L"
    },

    {
        id: "ast",
        name: "AST",
        low: 8,
        high: 33,
        unit: "U/L"
    },

    {
        id: "alp",
        name: "ALP",
        low: 20,
        high: 130,
        unit: "U/L"
    },

    {
        id: "bilirubin",
        name: "Total Bilirubin",
        low: 0.1,
        high: 1.2,
        unit: "mg/dL"
    },

    {
        id: "albumin",
        name: "Albumin",
        low: 3.4,
        high: 5.4,
        unit: "g/dL"
    },

    {
        id: "totalProtein",
        name: "Total Protein",
        low: 6.0,
        high: 8.3,
        unit: "g/dL"
    },

    {
        id: "tsh",
        name: "TSH",
        low: 0.27,
        high: 4.20,
        unit: "mIU/L"
    },

    {
        id: "freeT4",
        name: "Free T4",
        low: 0.8,
        high: 1.9,
        unit: "ng/dL"
    },

    {
        id: "vitaminD",
        name: "Vitamin D",
        low: 10,
        high: 50,
        unit: "ng/mL"
    },

    {
        id: "vitaminB12",
        name: "Vitamin B12",
        low: 299,
        high: 1054,
        unit: "pg/mL"
    },

    {
        id: "folate",
        name: "Folate",
        low: 2.7,
        high: 17,
        unit: "ng/mL"
    },

    {
        id: "ferritin",
        name: "Ferritin",
        male: [30, 400],
        female: [13, 150],
        unit: "ng/mL"
    },

    {
        id: "iron",
        name: "Iron",
        male: [59, 158],
        female: [37, 145],
        unit: "µg/dL"
    },

    {
        id: "magnesium",
        name: "Magnesium",
        low: 1.7,
        high: 2.2,
        unit: "mg/dL"
    },

    {
        id: "calcium",
        name: "Calcium",
        low: 8.5,
        high: 10.2,
        unit: "mg/dL"
    },

    {
        id: "phosphorus",
        name: "Phosphorus",
        low: 2.5,
        high: 4.5,
        unit: "mg/dL"
    },

    {
        id: "crp",
        name: "CRP",
        low: 0,
        high: 0.8,
        unit: "mg/dL"
    },

    {
        id: "esr",
        name: "ESR",
        unit: "mm/hr",
        special: "esr"
    }

];


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getGender() {

    const gender =
        document.getElementById("gender");

    return gender
        ? gender.value
        : "";
}


function getAge() {

    const age =
        document.getElementById("age");

    if (!age || age.value === "") {
        return null;
    }

    const value =
        Number(age.value);

    return Number.isFinite(value)
        ? value
        : null;
}


function formatNumber(value) {

    if (value === Infinity) {
        return "No fixed upper limit";
    }

    if (Number.isInteger(value)) {
        return String(value);
    }

    return String(value);
}


/* =========================================================
   GET TEST RANGE
   ========================================================= */

function getTestRange(test) {

    const gender =
        getGender();

    const age =
        getAge();


    /* Gender-specific */

    if (
        test.male &&
        test.female
    ) {

        if (gender === "Male") {

            return test.male;
        }

        if (gender === "Female") {

            return test.female;
        }

        return null;
    }


    /* ESR */

    if (
        test.special === "esr"
    ) {

        if (
            gender === "Male" &&
            age !== null
        ) {

            if (age <= 50) {
                return [0, 15];
            }

            return [0, 20];
        }


        if (
            gender === "Female" &&
            age !== null
        ) {

            if (age <= 50) {
                return [0, 20];
            }

            return [0, 30];
        }


        return null;
    }


    /* Standard range */

    if (
        test.low !== undefined &&
        test.high !== undefined
    ) {

        return [
            test.low,
            test.high
        ];
    }


    return null;
}


/* =========================================================
   REFERENCE RANGES
   ========================================================= */

function updateReferenceRanges() {

    tests.forEach(function(test) {

        const rangeElement =
            document.getElementById(
                test.id + "Range"
            );


        if (!rangeElement) {
            return;
        }


        if (
            test.special ===
            "fastingGlucose"
        ) {

            rangeElement.textContent =
                "Normal: < 100 mg/dL | Prediabetes: 100–125 | Diabetes: ≥ 126";

            return;
        }


        if (
            test.special === "ldl"
        ) {

            rangeElement.textContent =
                "General target: < 100 mg/dL; target may vary by cardiovascular risk.";

            return;
        }


        if (
            test.special === "hdl"
        ) {

            if (
                getGender() === "Male"
            ) {

                rangeElement.textContent =
                    "Low: < 40 mg/dL | ≥ 60 mg/dL is generally favorable";

            } else if (
                getGender() === "Female"
            ) {

                rangeElement.textContent =
                    "Low: < 50 mg/dL | ≥ 60 mg/dL is generally favorable";

            } else {

                rangeElement.textContent =
                    "Male low: < 40 | Female low: < 50 | ≥ 60 is generally favorable";
            }

            return;
        }


        if (
            test.special === "egfr"
        ) {

            rangeElement.textContent =
                "Common reference: ≥ 90 mL/min/1.73m²";

            return;
        }


        const range =
            getTestRange(test);


        if (!range) {

            if (
                test.male &&
                test.female
            ) {

                rangeElement.textContent =
                    "Select gender to show reference range.";

            } else {

                rangeElement.textContent =
                    "";
            }

            return;
        }


        rangeElement.textContent =
            "Reference: " +
            formatNumber(range[0]) +
            " - " +
            formatNumber(range[1]) +
            " " +
            test.unit;

    });


    /* Update ESR manually if needed */

    const esrRange =
        document.getElementById(
            "esrRange"
        );


    if (esrRange) {

        const age = getAge();

        const gender = getGender();


        if (
            gender &&
            age !== null
        ) {

            const range =
                getTestRange(
                    tests.find(
                        test =>
                            test.id === "esr"
                    )
                );


            if (range) {

                esrRange.textContent =
                    "Reference: " +
                    range[0] +
                    " - " +
                    range[1] +
                    " mm/hr";
            }

        } else {

            esrRange.textContent =
                "Select age and gender to show reference.";
        }
    }

}


/* =========================================================
   RANGE CHECK
   ========================================================= */

function checkRange(
    value,
    range
) {

    if (!Number.isFinite(value)) {
        return null;
    }


    if (!range) {
        return null;
    }


    const low = range[0];

    const high = range[1];


    if (value < low) {

        return "low";
    }


    if (
        high !== Infinity &&
        value > high
    ) {

        return "high";
    }


    return "good";
}


/* =========================================================
   SUMMARY
   ========================================================= */

function resetSummary() {

    goodCount = 0;

    lowCount = 0;

    highCount = 0;

    warningCount = 0;
}


function addToSummary(
    status
) {

    if (status === "good") {

        goodCount++;

    } else if (
        status === "low"
    ) {

        lowCount++;

    } else if (
        status === "high"
    ) {

        highCount++;

    } else if (
        status === "warning"
    ) {

        warningCount++;
    }
}


/* =========================================================
   GET INPUT VALUE
   ========================================================= */

function getInputValue(id) {

    const element =
        document.getElementById(id);


    if (
        !element ||
        element.value === ""
    ) {

        return null;
    }


    const value =
        Number(element.value);


    return Number.isFinite(value)
        ? value
        : null;
}


/* =========================================================
   SHOW RESULT
   ========================================================= */

function showResult(
    id,
    status,
    text
) {

    const element =
        document.getElementById(
            id + "Result"
        );


    if (!element) {
        return;
    }


    element.className =
        "result-box";


    if (status) {

        element.classList.add(
            status
        );
    }


    element.textContent =
        text;
}


/* =========================================================
   STANDARD TEST ANALYSIS
   ========================================================= */

function analyzeStandardTest(
    test
) {

    const value =
        getInputValue(
            test.id
        );


    if (value === null) {

        showResult(
            test.id,
            "",
            "Not Entered"
        );

        return null;
    }


    const range =
        getTestRange(test);


    if (!range) {

        showResult(
            test.id,
            "warning",
            "Select age/gender"
        );

        addToSummary(
            "warning"
        );

        return "warning";
    }


    const status =
        checkRange(
            value,
            range
        );


    if (status === "good") {

        showResult(
            test.id,
            "good",
            "Good"
        );

    } else if (
        status === "low"
    ) {

        showResult(
            test.id,
            "low",
            "Low"
        );

    } else if (
        status === "high"
    ) {

        showResult(
            test.id,
            "high",
            "High"
        );
    }


    addToSummary(
        status
    );


    return status;
}


/* =========================================================
   FASTING GLUCOSE
   ========================================================= */

function analyzeGlucose() {

    const value =
        getInputValue(
            "glucose"
        );


    if (value === null) {

        showResult(
            "glucose",
            "",
            "Not Entered"
        );

        return null;
    }


    if (value < 70) {

        showResult(
            "glucose",
            "low",
            "Low"
        );

        addToSummary("low");

        return "low";
    }


    if (value <= 99) {

        showResult(
            "glucose",
            "good",
            "Normal"
        );

        addToSummary("good");

        return "good";
    }


    if (value <= 125) {

        showResult(
            "glucose",
            "warning",
            "Prediabetes Range"
        );

        addToSummary("warning");

        return "warning";
    }


    showResult(
        "glucose",
        "high",
        "Diabetes Range"
    );

    addToSummary("high");

    return "high";
}


/* =========================================================
   HbA1c
   ========================================================= */

function analyzeHbA1c() {

    const value =
        getInputValue(
            "hba1c"
        );


    if (value === null) {

        showResult(
            "hba1c",
            "",
            "Not Entered"
        );

        return null;
    }


    if (value < 5.7) {

        showResult(
            "hba1c",
            "good",
            "Normal"
        );

        addToSummary("good");

        return "good";
    }


    if (value < 6.5) {

        showResult(
            "hba1c",
            "warning",
            "Prediabetes Range"
        );

        addToSummary("warning");

        return "warning";
    }


    showResult(
        "hba1c",
        "high",
        "Diabetes Range"
    );

    addToSummary("high");

    return "high";
}


/* =========================================================
   LDL
   ========================================================= */

function analyzeLDL() {

    const value =
        getInputValue(
            "ldl"
        );


    if (value === null) {

        showResult(
            "ldl",
            "",
            "Not Entered"
        );

        return null;
    }


    if (value < 100) {

        showResult(
            "ldl",
            "good",
            "General Target Met"
        );

        addToSummary("good");

        return "good";
    }


    if (value < 160) {

        showResult(
            "ldl",
            "warning",
            "Above General Target"
        );

        addToSummary("warning");

        return "warning";
    }


    showResult(
        "ldl",
        "high",
        "High"
    );

    addToSummary("high");

    return "high";
}


/* =========================================================
   HDL
   ========================================================= */

function analyzeHDL() {

    const value =
        getInputValue(
            "hdl"
        );


    if (value === null) {

        showResult(
            "hdl",
            "",
            "Not Entered"
        );

        return null;
    }


    const gender =
        getGender();


    let lowLimit = 40;


    if (
        gender === "Female"
    ) {

        lowLimit = 50;
    }


    if (
        value < lowLimit
    ) {

        showResult(
            "hdl",
            "low",
            "Low"
        );

        addToSummary("low");

        return "low";
    }


    showResult(
        "hdl",
        "good",
        "Acceptable"
    );

    addToSummary("good");

    return "good";
}


/* =========================================================
   eGFR
   ========================================================= */

function analyzeEGFR() {

    const value =
        getInputValue(
            "egfr"
        );


    if (value === null) {

        showResult(
            "egfr",
            "",
            "Not Entered"
        );

        return null;
    }


    if (value >= 90) {

        showResult(
            "egfr",
            "good",
            "≥ 90"
        );

        addToSummary("good");

        return "good";
    }


    if (value >= 60) {

        showResult(
            "egfr",
            "warning",
            "Below 90"
        );

        addToSummary("warning");

        return "warning";
    }


    showResult(
        "egfr",
        "high",
        "Low eGFR"
    );

    addToSummary("high");

    return "high";
}


/* =========================================================
   ESR
   ========================================================= */

function analyzeESR() {

    const value =
        getInputValue(
            "esr"
        );


    if (value === null) {

        showResult(
            "esr",
            "",
            "Not Entered"
        );

        return null;
    }


    const test =
        tests.find(
            item =>
                item.id === "esr"
        );


    const range =
        getTestRange(test);


    if (!range) {

        showResult(
            "esr",
            "warning",
            "Select age/gender"
        );

        addToSummary("warning");

        return "warning";
    }


    if (
        value >= range[0] &&
        value <= range[1]
    ) {

        showResult(
            "esr",
            "good",
            "Within Range"
        );

        addToSummary("good");

        return "good";
    }


    showResult(
        "esr",
        "high",
        "Above Range"
    );

    addToSummary("high");

    return "high";
}


/* =========================================================
   URINE RESULT
   ========================================================= */

function showUrineResult(
    id
) {

    const element =
        document.getElementById(id);

    if (
        !element ||
        element.value === ""
    ) {

        const result =
            document.getElementById(
                id + "Result"
            );

        if (result) {

            result.className =
                "result-box";

            result.textContent =
                "Not Entered";
        }

        return null;
    }


    const result =
        document.getElementById(
            id + "Result"
        );


    if (!result) {
        return null;
    }


    result.className =
        "result-box";


    if (
        element.value === "Negative"
    ) {

        result.classList.add(
            "good"
        );

        result.textContent =
            "Normal";

        addToSummary("good");

        return "good";
    }


    result.classList.add(
        "warning"
    );

    result.textContent =
        "Positive";

    addToSummary("warning");

    return "warning";
}


/* =========================================================
   URINE NUMERIC RESULT
   ========================================================= */

function showUrineNumericResult(
    id,
    low,
    high
) {

    const value =
        getInputValue(id);


    if (value === null) {

        showResult(
            id,
            "",
            "Not Entered"
        );

        return null;
    }


    if (
        value >= low &&
        value <= high
    ) {

        showResult(
            id,
            "good",
            "Within Range"
        );

        addToSummary("good");

        return "good";
    }


    showResult(
        id,
        "warning",
        "Outside Common Range"
    );

    addToSummary("warning");

    return "warning";
}


/* =========================================================
   ANALYSIS SUMMARY
   ========================================================= */

function showSummary() {

    const summaryCard =
        document.getElementById(
            "analysisSummaryCard"
        );


    if (summaryCard) {

        summaryCard.style.display =
            "block";
    }


    document.getElementById(
        "goodCount"
    ).textContent =
        goodCount;


    document.getElementById(
        "lowCount"
    ).textContent =
        lowCount;


    document.getElementById(
        "highCount"
    ).textContent =
        highCount;


    document.getElementById(
        "warningCount"
    ).textContent =
        warningCount;
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    document.getElementById(
        "dashboardGood"
    ).textContent =
        goodCount;


    document.getElementById(
        "dashboardLow"
    ).textContent =
        lowCount;


    document.getElementById(
        "dashboardHigh"
    ).textContent =
        highCount;


    document.getElementById(
        "dashboardWarning"
    ).textContent =
        warningCount;
}


/* =========================================================
   OVERALL ASSESSMENT
   ========================================================= */

function generateOverallAssessment() {

    const assessmentMessage =
        document.getElementById(
            "assessmentMessage"
        );


    const categoryAssessment =
        document.getElementById(
            "categoryAssessment"
        );


    const total =
        goodCount +
        lowCount +
        highCount +
        warningCount;


    if (total === 0) {

        assessmentMessage.textContent =
            "No laboratory results were entered.";

        categoryAssessment.textContent =
            "Enter at least one result and analyze again.";

        return;
    }


    if (
        highCount > 0
    ) {

        assessmentMessage.textContent =
            "Some entered results are above the selected educational reference or decision threshold.";

    } else if (
        lowCount > 0
    ) {

        assessmentMessage.textContent =
            "Some entered results are below the selected educational reference range.";

    } else if (
        warningCount > 0
    ) {

        assessmentMessage.textContent =
            "Some entered results require attention or additional clinical context.";

    } else {

        assessmentMessage.textContent =
            "The entered results are within the educational ranges used by this project.";
    }


    categoryAssessment.textContent =
        "This is an educational screening summary, not a medical diagnosis.";
}


/* =========================================================
   ABNORMAL RESULTS
   ========================================================= */

function generateAbnormalResults() {

    const list =
        document.getElementById(
            "abnormalList"
        );


    list.innerHTML = "";


    const results = [];


    tests.forEach(function(test) {

        const value =
            getInputValue(
                test.id
            );


        if (value === null) {
            return;
        }


        let status = null;


        if (
            test.special ===
            "fastingGlucose"
        ) {

            if (value < 70) {

                status = "Low";

            } else if (
                value <= 99
            ) {

                status = null;

            } else if (
                value <= 125
            ) {

                status =
                    "Prediabetes Range";

            } else {

                status =
                    "Diabetes Range";
            }

        } else if (
            test.special === "ldl"
        ) {

            if (value >= 100) {

                status =
                    value < 160
                        ? "Above General Target"
                        : "High";
            }

        } else if (
            test.special === "hdl"
        ) {

            const gender =
                getGender();

            const limit =
                gender === "Female"
                    ? 50
                    : 40;

            if (value < limit) {

                status = "Low";
            }

        } else if (
            test.special === "egfr"
        ) {

            if (value < 90) {

                status =
                    value >= 60
                        ? "Below 90"
                        : "Low eGFR";
            }

        } else if (
            test.special === "esr"
        ) {

            const range =
                getTestRange(test);

            if (
                range &&
                (
                    value < range[0] ||
                    value > range[1]
                )
            ) {

                status =
                    "Above/Outside Range";
            }

        } else {

            const range =
                getTestRange(test);


            if (range) {

                if (
                    value < range[0]
                ) {

                    status = "Low";

                } else if (
                    range[1] !== Infinity &&
                    value > range[1]
                ) {

                    status = "High";
                }
            }
        }


        if (status) {

            results.push(
                test.name +
                ": " +
                status +
                " (" +
                value +
                " " +
                test.unit +
                ")"
            );
        }

    });


    /* HbA1c */

    const hba1c =
        getInputValue(
            "hba1c"
        );


    if (hba1c !== null) {

        if (hba1c >= 5.7) {

            results.push(
                "HbA1c: " +
                (
                    hba1c >= 6.5
                        ? "Diabetes Range"
                        : "Prediabetes Range"
                ) +
                " (" +
                hba1c +
                " %)"
            );
        }
    }


    /* Urine */

    const urineTests = [
        {
            id: "urineProtein",
            name: "Urine Protein"
        },
        {
            id: "urineGlucose",
            name: "Urine Glucose"
        },
        {
            id: "urineBlood",
            name: "Urine Blood"
        },
        {
            id: "urineKetones",
            name: "Urine Ketones"
        }
    ];


    urineTests.forEach(function(item) {

        const element =
            document.getElementById(
                item.id
            );


        if (
            element &&
            element.value === "Positive"
        ) {

            results.push(
                item.name +
                ": Positive"
            );
        }

    });


    /* Urine pH */

    const urinePH =
        getInputValue(
            "urinePH"
        );


    if (
        urinePH !== null &&
        (
            urinePH < 4.5 ||
            urinePH > 8
        )
    ) {

        results.push(
            "Urine pH: Outside common range (" +
            urinePH +
            ")"
        );
    }


    /* Specific Gravity */

    const gravity =
        getInputValue(
            "urineSpecificGravity"
        );


    if (
        gravity !== null &&
        (
            gravity < 1.005 ||
            gravity > 1.030
        )
    ) {

        results.push(
            "Specific Gravity: Outside common range (" +
            gravity +
            ")"
        );
    }


    if (results.length === 0) {

        const item =
            document.createElement(
                "li"
            );

        item.textContent =
            "No abnormal or warning results were identified.";

        list.appendChild(
            item
        );

        return;
    }


    results.forEach(function(text) {

        const item =
            document.createElement(
                "li"
            );

        item.textContent =
            text;

        list.appendChild(
            item
        );

    });
}


/* =========================================================
   RECOMMENDATIONS
   ========================================================= */

function generateRecommendations() {

    const list =
        document.getElementById(
            "recommendationList"
        );


    list.innerHTML = "";


    const recommendations = [];


    if (
        lowCount === 0 &&
        highCount === 0 &&
        warningCount === 0
    ) {

        recommendations.push(
            "Continue regular healthy habits and follow the reference ranges printed on your laboratory report."
        );
    }


    if (
        getInputValue(
            "vitaminD"
        ) !== null &&
        getInputValue(
            "vitaminD"
        ) < 20
    ) {

        recommendations.push(
            "Vitamin D is below the educational threshold. Discuss the result with a healthcare professional before starting supplementation."
        );
    }


    if (
        getInputValue(
            "vitaminB12"
        ) !== null &&
        getInputValue(
            "vitaminB12"
        ) < 299
    ) {

        recommendations.push(
            "Vitamin B12 is below the educational range. Consider discussing diet, absorption, medications, and supplementation with a healthcare professional."
        );
    }


    if (
        getInputValue(
            "ferritin"
        ) !== null
    ) {

        const ferritin =
            getInputValue(
                "ferritin"
            );

        const range =
            getTestRange(
                tests.find(
                    test =>
                        test.id ===
                        "ferritin"
                )
            );


        if (
            range &&
            ferritin < range[0]
        ) {

            recommendations.push(
                "Ferritin is below the selected reference range. Iron status should be interpreted together with CBC and other iron studies."
            );
        }
    }


    if (
        getInputValue(
            "ldl"
        ) !== null &&
        getInputValue(
            "ldl"
        ) >= 100
    ) {

        recommendations.push(
            "LDL is above the general target used by this educational analyzer. Individual LDL goals depend on cardiovascular risk."
        );
    }


    if (
        getInputValue(
            "triglycerides"
        ) !== null &&
        getInputValue(
            "triglycerides"
        ) >= 150
    ) {

        recommendations.push(
            "Triglycerides are above the usual desirable threshold. Discuss the result with your healthcare professional, especially if repeated."
        );
    }


    if (
        getInputValue(
            "glucose"
        ) !== null &&
        getInputValue(
            "glucose"
        ) >= 100
    ) {

        recommendations.push(
            "Fasting glucose is above the normal screening range. Confirmation and clinical interpretation may be needed."
        );
    }


    if (
        getInputValue(
            "hba1c"
        ) !== null &&
        getInputValue(
            "hba1c"
        ) >= 5.7
    ) {

        recommendations.push(
            "HbA1c is in a prediabetes or diabetes range according to CDC screening thresholds; diagnosis should be confirmed and interpreted clinically."
        );
    }


    if (
        getInputValue(
            "crp"
        ) !== null &&
        getInputValue(
            "crp"
        ) > 0.8
    ) {

        recommendations.push(
            "CRP is above the common educational threshold. CRP is nonspecific and should be interpreted with symptoms and other clinical information."
        );
    }


    recommendations.push(
        "Use the laboratory report's own reference ranges whenever they differ from the ranges shown here."
    );


    recommendations.forEach(
        function(text) {

            const item =
                document.createElement(
                    "li"
                );

            item.textContent =
                text;

            list.appendChild(
                item
            );

        }
    );
}


/* =========================================================
   MEAL PLAN
   ========================================================= */

function generateMealPlan() {

    const container =
        document.getElementById(
            "mealPlanContent"
        );


    container.innerHTML = "";


    const meals = [];


    const diet =
        document.getElementById(
            "diet"
        ).value;


    if (
        getInputValue(
            "vitaminD"
        ) !== null &&
        getInputValue(
            "vitaminD"
        ) < 20
    ) {

        meals.push(
            "Vitamin D sources: consider fortified foods and appropriate dietary sources; supplementation should be discussed with a healthcare professional."
        );
    }


    if (
        getInputValue(
            "vitaminB12"
        ) !== null &&
        getInputValue(
            "vitaminB12"
        ) < 299
    ) {

        if (
            diet === "Vegan"
        ) {

            meals.push(
                "Vitamin B12: fortified foods or an appropriate B12 supplement may be important for vegan diets; discuss the amount with a healthcare professional."
            );

        } else {

            meals.push(
                "Vitamin B12 sources can include eggs, dairy, fish, meat, or fortified foods depending on dietary preference."
            );
        }
    }


    if (
        getInputValue(
            "ferritin"
        ) !== null
    ) {

        const range =
            getTestRange(
                tests.find(
                    test =>
                        test.id ===
                        "ferritin"
                )
            );


        if (
            range &&
            getInputValue(
                "ferritin"
            ) < range[0]
        ) {

            if (
                diet === "Vegan" ||
                diet === "Vegetarian"
            ) {

                meals.push(
                    "Iron-rich plant foods: lentils, beans, chickpeas, spinach, and iron-fortified foods. Combining plant iron with vitamin C sources can support absorption."
                );

            } else {

                meals.push(
                    "Iron-rich foods may include lean meat, beans, lentils, spinach, and fortified foods. Discuss confirmed iron deficiency before taking iron supplements."
                );
            }
        }
    }


    if (
        getInputValue(
            "ldl"
        ) !== null &&
        getInputValue(
            "ldl"
        ) >= 100
    ) {

        meals.push(
            "For general heart-healthy eating: emphasize vegetables, fruits, whole grains, legumes, nuts, and unsaturated fats while reducing saturated fat."
        );
    }


    if (
        getInputValue(
            "triglycerides"
        ) !== null &&
        getInputValue(
            "triglycerides"
        ) >= 150
    ) {

        meals.push(
            "For elevated triglycerides: emphasize vegetables, fiber-rich foods, whole foods, and limit excess added sugars and refined carbohydrates."
        );
    }


    if (
        meals.length === 0
    ) {

        meals.push(
            "Balanced Meal Example: vegetables + whole grains + a protein source + fruit + water."
        );

        meals.push(
            "This meal plan is general educational information and is not a therapeutic diet."
        );
    }


    meals.forEach(
        function(text) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "meal-item";

            div.textContent =
                text;

            container.appendChild(
                div
            );

        }
    );
}


/* =========================================================
   COLLECT DATA FOR BACKEND
   ========================================================= */

function collectTestData() {

    const data = {

        user_id: userId,

        test_date:
            document.getElementById(
                "savedTestDate"
            ).value ||
            new Date()
                .toISOString()
                .split("T")[0],

        age:
            getInputValue(
                "age"
            ),

        gender:
            document.getElementById(
                "gender"
            ).value,

        diet:
            document.getElementById(
                "diet"
            ).value,

        hemoglobin:
            getInputValue(
                "hemoglobin"
            ),

        wbc:
            getInputValue(
                "wbc"
            ),

        rbc:
            getInputValue(
                "rbc"
            ),

        platelets:
            getInputValue(
                "platelets"
            ),

        hematocrit:
            getInputValue(
                "hematocrit"
            ),

        mcv:
            getInputValue(
                "mcv"
            ),

        neutrophils:
            getInputValue(
                "neutrophils"
            ),

        lymphocytes:
            getInputValue(
                "lymphocytes"
            ),

        glucose:
            getInputValue(
                "glucose"
            ),

        hba1c:
            getInputValue(
                "hba1c"
            ),

        total_cholesterol:
            getInputValue(
                "totalCholesterol"
            ),

        ldl:
            getInputValue(
                "ldl"
            ),

        hdl:
            getInputValue(
                "hdl"
            ),

        triglycerides:
            getInputValue(
                "triglycerides"
            ),

        creatinine:
            getInputValue(
                "creatinine"
            ),

        bun:
            getInputValue(
                "bun"
            ),

        egfr:
            getInputValue(
                "egfr"
            ),

        uric_acid:
            getInputValue(
                "uricAcid"
            ),

        alt:
            getInputValue(
                "alt"
            ),

        ast:
            getInputValue(
                "ast"
            ),

        alp:
            getInputValue(
                "alp"
            ),

        bilirubin:
            getInputValue(
                "bilirubin"
            ),

        albumin:
            getInputValue(
                "albumin"
            ),

        total_protein:
            getInputValue(
                "totalProtein"
            ),

        tsh:
            getInputValue(
                "tsh"
            ),

        free_t4:
            getInputValue(
                "freeT4"
            ),

        vitamin_d:
            getInputValue(
                "vitaminD"
            ),

        vitamin_b12:
            getInputValue(
                "vitaminB12"
            ),

        folate:
            getInputValue(
                "folate"
            ),

        ferritin:
            getInputValue(
                "ferritin"
            ),

        iron:
            getInputValue(
                "iron"
            ),

        magnesium:
            getInputValue(
                "magnesium"
            ),

        calcium:
            getInputValue(
                "calcium"
            ),

        phosphorus:
            getInputValue(
                "phosphorus"
            ),

        crp:
            getInputValue(
                "crp"
            ),

        esr:
            getInputValue(
                "esr"
            ),

        urine_protein:
            document.getElementById(
                "urineProtein"
            ).value,

        urine_glucose:
            document.getElementById(
                "urineGlucose"
            ).value,

        urine_blood:
            document.getElementById(
                "urineBlood"
            ).value,

        urine_ketones:
            document.getElementById(
                "urineKetones"
            ).value,

        urine_ph:
            getInputValue(
                "urinePH"
            ),

        urine_specific_gravity:
            getInputValue(
                "urineSpecificGravity"
            )
    };


    return data;
}


/* =========================================================
   SAVE TEST
   ========================================================= */

async function saveCurrentTest() {

    const saveMessage =
        document.getElementById(
            "saveMessage"
        );


    saveMessage.textContent =
        "Saving test...";


    try {

        const data =
            collectTestData();


        const response =
            await fetch(
                API_BASE_URL +
                "/api/tests",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            data
                        )
                }
            );


        const result =
            await response.json()
                .catch(
                    () => ({})
                );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to save test."
            );
        }


        saveMessage.textContent =
            result.message ||
            "Test saved successfully.";


        await displaySavedTests();

    } catch (error) {

        console.error(error);


        saveMessage.textContent =
            "Error saving test: " +
            error.message;
    }
}


/* =========================================================
   DISPLAY SAVED TESTS
   ========================================================= */

function displayValue(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "Not entered";
    }


    return String(value);
}


async function displaySavedTests() {

    const container =
        document.getElementById(
            "savedTestsList"
        );


    container.textContent =
        "Loading saved tests...";


    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/api/tests?user_id=" +
                encodeURIComponent(
                    userId
                )
            );


        const testsData =
            await response.json()
                .catch(
                    () => []
                );


        if (!response.ok) {

            throw new Error(
                "Failed to load saved tests."
            );
        }


        container.innerHTML = "";


        if (
            !Array.isArray(
                testsData
            ) ||
            testsData.length === 0
        ) {

            const empty =
                document.createElement(
                    "p"
                );

            empty.textContent =
                "No saved tests yet.";

            container.appendChild(
                empty
            );

            return;
        }


        testsData.forEach(
            function(test) {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "saved-test-card";


                const title =
                    document.createElement(
                        "h3"
                    );

                title.textContent =
                    "Test Date: " +
                    displayValue(
                        test.test_date
                    );


                const info =
                    document.createElement(
                        "p"
                    );

                info.textContent =
                    "Age: " +
                    displayValue(
                        test.age
                    ) +
                    " | Gender: " +
                    displayValue(
                        test.gender
                    ) +
                    " | Diet: " +
                    displayValue(
                        test.diet
                    );


                const values =
                    document.createElement(
                        "p"
                    );

                values.textContent =
                    "Hemoglobin: " +
                    displayValue(
                        test.hemoglobin
                    ) +
                    " | Glucose: " +
                    displayValue(
                        test.glucose
                    ) +
                    " | HbA1c: " +
                    displayValue(
                        test.hba1c
                    );


                card.appendChild(
                    title
                );

                card.appendChild(
                    info
                );

                card.appendChild(
                    values
                );


                container.appendChild(
                    card
                );

            }
        );

    } catch (error) {

        console.error(error);


        container.textContent =
            "Error loading saved tests: " +
            error.message;
    }
}


/* =========================================================
   DELETE SAVED TESTS
   ========================================================= */

async function deleteSavedTests() {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete all saved tests?"
        );


    if (!confirmed) {
        return;
    }


    const saveMessage =
        document.getElementById(
            "saveMessage"
        );


    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/api/tests?user_id=" +
                encodeURIComponent(
                    userId
                ),
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json()
                .catch(
                    () => ({})
                );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to delete saved tests."
            );
        }


        saveMessage.textContent =
            result.message ||
            "Saved tests deleted successfully.";


        await displaySavedTests();


        if (trendChart) {

            trendChart.destroy();

            trendChart = null;
        }

    } catch (error) {

        console.error(error);


        saveMessage.textContent =
            "Error deleting tests: " +
            error.message;
    }
}


/* =========================================================
   TREND TITLE
   ========================================================= */

function getTrendTitle(
    field
) {

    const titles = {

        hemoglobin:
            "Hemoglobin",

        wbc:
            "WBC",

        rbc:
            "RBC",

        platelets:
            "Platelets",

        hematocrit:
            "Hematocrit",

        mcv:
            "MCV",

        glucose:
            "Fasting Glucose",

        hba1c:
            "HbA1c",

        total_cholesterol:
            "Total Cholesterol",

        ldl:
            "LDL",

        hdl:
            "HDL",

        triglycerides:
            "Triglycerides",

        creatinine:
            "Creatinine",

        bun:
            "BUN",

        egfr:
            "eGFR",

        uric_acid:
            "Uric Acid",

        alt:
            "ALT",

        ast:
            "AST",

        tsh:
            "TSH",

        free_t4:
            "Free T4",

        vitamin_d:
            "Vitamin D",

        vitamin_b12:
            "Vitamin B12",

        ferritin:
            "Ferritin",

        iron:
            "Iron",

        calcium:
            "Calcium",

        crp:
            "CRP",

        esr:
            "ESR"
    };


    return (
        titles[field] ||
        field
    );
}


/* =========================================================
   TREND UNIT
   ========================================================= */

function getTrendUnit(
    field
) {

    const units = {

        hemoglobin:
            "g/dL",

        wbc:
            "×10³/µL",

        rbc:
            "×10⁶/µL",

        platelets:
            "×10³/µL",

        hematocrit:
            "%",

        mcv:
            "fL",

        glucose:
            "mg/dL",

        hba1c:
            "%",

        total_cholesterol:
            "mg/dL",

        ldl:
            "mg/dL",

        hdl:
            "mg/dL",

        triglycerides:
            "mg/dL",

        creatinine:
            "mg/dL",

        bun:
            "mg/dL",

        egfr:
            "mL/min/1.73m²",

        uric_acid:
            "mg/dL",

        alt:
            "U/L",

        ast:
            "U/L",

        tsh:
            "mIU/L",

        free_t4:
            "ng/dL",

        vitamin_d:
            "ng/mL",

        vitamin_b12:
            "pg/mL",

        ferritin:
            "ng/mL",

        iron:
            "µg/dL",

        calcium:
            "mg/dL",

        crp:
            "mg/dL",

        esr:
            "mm/hr"
    };


    return (
        units[field] ||
        ""
    );
}


/* =========================================================
   GENERATE TREND
   ========================================================= */

async function generateSelectedTrend() {

    const field =
        document.getElementById(
            "trendTest"
        ).value;


    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/api/tests?user_id=" +
                encodeURIComponent(
                    userId
                )
            );


        const testsData =
            await response.json()
                .catch(
                    () => []
                );


        if (!response.ok) {

            throw new Error(
                "Failed to load saved tests."
            );
        }


        if (
            !Array.isArray(
                testsData
            ) ||
            testsData.length === 0
        ) {

            alert(
                "No saved tests available for the trend."
            );

            return;
        }


        const validData =
            testsData
                .filter(
                    item =>
                        item[field] !== null &&
                        item[field] !== undefined &&
                        item[field] !== ""
                )
                .sort(
                    (a, b) =>
                        new Date(
                            a.test_date
                        ) -
                        new Date(
                            b.test_date
                        )
                );


        if (
            validData.length === 0
        ) {

            alert(
                "No values are available for this test."
            );

            return;
        }


        const labels =
            validData.map(
                item =>
                    item.test_date
            );


        const values =
            validData.map(
                item =>
                    Number(
                        item[field]
                    )
            );


        const canvas =
            document.getElementById(
                "trendChart"
            );


        if (trendChart) {

            trendChart.destroy();
        }


        trendChart =
            new Chart(
                canvas,
                {
                    type: "line",

                    data: {

                        labels: labels,

                        datasets: [
                            {
                                label:
                                    getTrendTitle(
                                        field
                                    ) +
                                    " (" +
                                    getTrendUnit(
                                        field
                                    ) +
                                    ")",

                                data: values,

                                tension: 0.25,

                                borderWidth: 3,

                                pointRadius: 5,

                                fill: false
                            }
                        ]
                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio:
                            false,

                        plugins: {

                            legend: {
                                display: true
                            }

                        },

                        scales: {

                            y: {

                                beginAtZero:
                                    false,

                                title: {

                                    display: true,

                                    text:
                                        getTrendUnit(
                                            field
                                        )
                                }

                            },

                            x: {

                                title: {

                                    display: true,

                                    text:
                                        "Test Date"
                                }

                            }

                        }

                    }
                }
            );

    } catch (error) {

        console.error(error);


        alert(
            "Error generating trend: " +
            error.message
        );
    }
}


/* =========================================================
   ANALYZE ALL RESULTS
   ========================================================= */

function analyzeResults() {

    resetSummary();


    /* =====================================================
       STANDARD TESTS
       ===================================================== */

    tests.forEach(
        function(test) {

            if (
                test.id === "glucose" ||
                test.id === "ldl" ||
                test.id === "hdl" ||
                test.id === "egfr" ||
                test.id === "esr"
            ) {

                return;
            }


            analyzeStandardTest(
                test
            );

        }
    );


    /* =====================================================
       SPECIAL TESTS
       ===================================================== */

    analyzeGlucose();

    analyzeHbA1c();

    analyzeLDL();

    analyzeHDL();

    analyzeEGFR();

    analyzeESR();


    /* =====================================================
       URINALYSIS
       ===================================================== */

    showUrineResult(
        "urineProtein"
    );

    showUrineResult(
        "urineGlucose"
    );

    showUrineResult(
        "urineBlood"
    );

    showUrineResult(
        "urineKetones"
    );


    showUrineNumericResult(
        "urinePH",
        4.5,
        8
    );


    showUrineNumericResult(
        "urineSpecificGravity",
        1.005,
        1.030
    );


    /* =====================================================
       UPDATE UI
       ===================================================== */

    showSummary();

    updateDashboard();

    generateOverallAssessment();

    generateAbnormalResults();

    generateRecommendations();

    generateMealPlan();


    /* =====================================================
       SCROLL TO SUMMARY
       ===================================================== */

    const summaryCard =
        document.getElementById(
            "analysisSummaryCard"
        );


    if (summaryCard) {

        setTimeout(
            function() {

                summaryCard.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            },
            100
        );
    }
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        updateReferenceRanges();

        displaySavedTests();

        const dateInput =
            document.getElementById(
                "savedTestDate"
            );


        if (
            dateInput &&
            !dateInput.value
        ) {

            dateInput.value =
                new Date()
                    .toISOString()
                    .split("T")[0];
        }

    }
);


/* =========================================================
   UPDATE RANGES WHEN AGE/GENDER CHANGES
   ========================================================= */

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.id === "gender" ||
            event.target.id === "age"
        ) {

            updateReferenceRanges();
        }

    }
);