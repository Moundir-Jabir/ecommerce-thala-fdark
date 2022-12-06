const request = require('supertest')
const app = require('../index')

describe("POST /api/auth/login", () => {
    describe('if body is empty', () => {
        test('test if email and password is empty', async () => {
            let body = {
                email: "", password: ""
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Not found user with this email")
        })
    })

    describe('if body is not empty', () => {
        test('test if email not exist in database', async () => {
            let body = {
                email: "mohamed@gmail.com", password: "dsdsdsdsdsd"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Not found user with this email")
        })

        test('test if email is not verified', async () => {
            let body = {
                email: "elmondhir.jabir@edu.uca.ma", password: "Kinematic1@"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Email is not verified, plese check your email")
        })

        test('test if password incorect', async () => {
            let body = {
                email: "elmondhirjabir@gmail.com", password: "ghghghghghghghg"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Incorect password")
        })

        test('test if password correct', async () => {
            let body = {
                email: "elmondhirjabir@gmail.com", password: "Kinematic1@"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("POST /api/auth/register", () => {
    
    let body = {
        name: "",
        email: "",
        password: ""
    }

    describe("given all registration credintials", () => {
        
        test("success", async () => {
            body = {
                name: "trtretre",
                email: "hghgjhgkkkk@gmail.com",
                password: "kgiygluglulg"
            }
            const response = await request(app).post("/api/auth/register").send(body)
            expect(response.statusCode).toBe(200)
        })

        test("error", async () => {
            body = {
                name: "trtretre",
                email: "hghgjhgkkkk@gmail.com",
                password: "kgiygluglulg"
            }
            const response = await request(app).post("/api/auth/register").send(body)
            expect(response.statusCode).toBe(400)
        })
    })

    describe("all or some of registration credintials is null", () => {
        
        test("error", async () => {
            body = {
                name: "",
                email: "",
                password: ""
            }
            const response = await request(app).post("/api/auth/register").send(body)
            expect(response.statusCode).toBe(400)
        })

    })

})