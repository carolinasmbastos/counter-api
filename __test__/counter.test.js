const request = require("supertest");
const app = require("../app");

beforeAll((done) => {
    request(app)
      .post('/auth/register')
      .send({
        email: 'test@counter.com',
        password: '1234',
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });

describe("Counter API test Suite", () => {


    test("current counter value is greater than Zero", done => {
      request(app)
        .get("/api/counter/current")
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
          data = response.body.data;
          expect(data).toHaveProperty('id');
          intialValue = data.id;
          expect(intialValue).toBeGreaterThanOrEqual(0);
          done();
        });
    });


    test("next counter value is incremented by one", done => {
        request(app)
          .get("/api/counter/next")
          .set('Authorization', `Bearer ${token}`)
          .then(response => {
            expect(response.statusCode).toBe(200);
            data = response.body.data
            expect(data).toHaveProperty('id');
            expect(data.id).toBe(intialValue+1);
            done();
          });
    });

    test("update couter value to 1000", done => {
        const updated = 1000;
        request(app)
          .put("/api/counter/current")
          .send({current : updated})
          .set('Authorization', `Bearer ${token}`)
          .then(response => {
            expect(response.statusCode).toBe(200);
            data = response.body.data
            expect(data).toHaveProperty('id');
            expect(data.id).toBe(updated);
            done();
          });
    });

});