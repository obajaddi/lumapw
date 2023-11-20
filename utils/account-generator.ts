import { faker } from "@faker-js/faker"

class AccountGenerator {
    public randomFirstname: string;
    public randomLastName: string;
    public newAccountPassword: string;
    public newAccountEmail: string;

    constructor() {
        this.randomFirstname = faker.person.firstName();
        this.randomLastName = faker.person.lastName();
        this.newAccountPassword = faker.internet.password({ length: 15, prefix: 'Passw0rd_' });
        this.newAccountEmail = faker.internet.email({ firstName: this.randomFirstname, lastName: this.randomLastName });
    }
}

export default new AccountGenerator()