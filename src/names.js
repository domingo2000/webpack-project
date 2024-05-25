export async function getName() {
    const { faker } = await import(
        "@faker-js/faker"
    );
    return faker.person.fullName();
}
