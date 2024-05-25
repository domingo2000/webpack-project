export async function getName() {
    const { faker } = await import(
        "@faker-js/faker/locale/en_US"
    );
    return faker.person.fullName();
}
