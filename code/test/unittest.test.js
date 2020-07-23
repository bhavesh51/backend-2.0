const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

let credit_card = {amount: 100,
currency: "USD",
type: "creditcard",
    card: {
    number: 4111111111111111,
    expirationMonth: 10,
    expirationYear:2019,
    cvv: 111
    }   
}


describe("Server!", () => {
  it("welcomes to Bhavesh Sadhu Application", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("test for creditcard", done => {
    chai
      .request(app)
      .post("/listcard")
      .send(credit_card)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});