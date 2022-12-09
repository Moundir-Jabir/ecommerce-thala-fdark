const request = require('supertest')
const fs = require('fs')
const app = require('../index')

describe("/api/categories", () => {
    
    let body = {
        name: ""
    }

    describe("POST /api/categories", () => {
        
        test("success", async () => {
            body = {
                name: "category"
            }
            const response = await request(app)
                .post("/api/categories")
                .set('content-type', 'multipart/form-data')
                .send(body)
                .attach('image', fs.readFileSync('/home/riad/Documents/webg.jpg'))
            expect(response.statusCode).toBe(200)
        })

        test("error", async () => {
            body = {
                name: ""
            }
            const response = await request(app).post("/api/categories").send(body)
            expect(response.statusCode).toBe(400)
        })
    })

    describe("PUT /api/categories", () => {
        
        test("success", async () => {
            body = {
                name: "category"
            }
            const response = await request(app)
                .post("/api/categories")
                .set('content-type', 'multipart/form-data')
                .send(body)
                .attach('image', fs.readFileSync('/home/riad/Documents/webg.jpg'))
            expect(response.statusCode).toBe(200)
        })

        test("error", async () => {
            body = {
                name: ""
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