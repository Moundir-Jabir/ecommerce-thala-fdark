const request = require('supertest')
const app = require('../index')

describe("/api/categories", () => {
    
    let body = {
        name: "",
        image: "",
    }

    describe("POST /api/categories", () => {
        
        test("success", async () => {
            body = {
                name: "category",
                image: "/images/test.png"
            }
            const response = await request(app).post("/api/categories").send(body)
            expect(response.statusCode).toBe(200)
        })

        test("error", async () => {
            body = {
                name: "",
                image: "",
            }
            const response = await request(app).post("/api/categories").send(body)
            expect(response.statusCode).toBe(400)
        })
    })

    describe("PUT /api/categories", () => {
        
        test("success", async () => {
            body = {
                name: "category",
                image: "/images/test1.png"
            }
            const response = await request(app).post("/api/categories").send(body)
            expect(response.statusCode).toBe(200)
        })

        test("error", async () => {
            body = {
                name: "",
                image: "",
            }
            const response = await request(app).post("/api/categories").send(body)
            expect(response.statusCode).toBe(400)
        })
    })

    describe("GET /api/categories", () => {
        
        test("success", async () => {
            const response = await request(app).get("/api/categories")
            expect(response.statusCode).toBe(200)
        })

    })

    describe("GET /api/categories/1", () => {
        
        test("success", async () => {
            const response = await request(app).get("/api/categories")
            expect(response.statusCode).toBe(200)
        })

    })
})