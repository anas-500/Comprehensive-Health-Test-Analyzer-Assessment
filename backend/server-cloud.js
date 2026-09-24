require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.use(express.static(path.join(__dirname, "website")));

/* =========================================================
   SUPABASE DATABASE
   ========================================================= */
const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

/* =========================================================
   DATABASE CONNECTION TEST
   ========================================================= */

app.get("/api/health", async function(req, res) {

    try {

        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "Cloud database connection is working",
            time: result.rows[0].now
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

/* =========================================================
   SAVE TEST
   ========================================================= */

app.post("/api/tests", async function(req, res) {

    try {

        const data = req.body;

        const columns = [
            "user_id",
            "test_date",
            "age",
            "gender",
            "diet",
            "hemoglobin",
            "wbc",
            "rbc",
            "platelets",
            "hematocrit",
            "mcv",
            "neutrophils",
            "lymphocytes",
            "glucose",
            "hba1c",
            "total_cholesterol",
            "ldl",
            "hdl",
            "triglycerides",
            "creatinine",
            "bun",
            "egfr",
            "uric_acid",
            "alt",
            "ast",
            "alp",
            "bilirubin",
            "albumin",
            "total_protein",
            "tsh",
            "free_t4",
            "vitamin_d",
            "vitamin_b12",
            "folate",
            "ferritin",
            "iron",
            "magnesium",
            "calcium",
            "phosphorus",
            "crp",
            "esr",
            "urine_protein",
            "urine_glucose",
            "urine_blood",
            "urine_ketones",
            "urine_ph",
            "urine_specific_gravity"
        ];

        const values = columns.map(function(column) {
            return data[column] ?? null;
        });

        const placeholders = columns.map(function(_, index) {
            return "$" + (index + 1);
        });

        const query = `
            INSERT INTO health_tests
            (${columns.join(", ")})
            VALUES (${placeholders.join(", ")})
            RETURNING id
        `;

        const result = await pool.query(query, values);

        res.json({
            success: true,
            id: result.rows[0].id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to save test",
            error: error.message
        });
    }
});

/* =========================================================
   GET TESTS
   ========================================================= */

app.get("/api/tests", async function(req, res) {

    try {

        const userId = req.query.user_id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user_id is required"
            });
        }

        const result = await pool.query(
            `
            SELECT *
            FROM health_tests
            WHERE user_id = $1
            ORDER BY test_date DESC, id DESC
            `,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get tests",
            error: error.message
        });
    }
});

/* =========================================================
   DELETE TESTS
   ========================================================= */

app.delete("/api/tests", async function(req, res) {

    try {

        const userId = req.query.user_id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user_id is required"
            });
        }

        await pool.query(
            `
            DELETE FROM health_tests
            WHERE user_id = $1
            `,
            [userId]
        );

        res.json({
            success: true,
            message: "Tests deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete tests",
            error: error.message
        });
    }
});

/* =========================================================
   START SERVER
   ========================================================= */

app.listen(PORT, function() {

    console.log("Cloud server is running on port " + PORT);
});