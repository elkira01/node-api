import { AuthorType } from '../type/AuthorType'

export class Author {
    constructor(
        private id: any,
        private type: AuthorType,
        private firstName: string,
        private lastName: string,
        private biography: string,
        private email?: string,
        private profileImageUrl?: string,
        private createdAt?: any,
        private updatedAt?: any
    ) {}

    getId() {
        return this.id
    }

    getFirstName() {
        return this.firstName
    }

    getLastName() {
        return this.lastName
    }

    getBiography() {
        return this.biography
    }

    getEmail() {
        return this.email
    }

    getProfileImageUrl() {
        return this.profileImageUrl
    }

    getCreatedAt() {
        return this.createdAt
    }

    getUpdatedAt() {
        return this.updatedAt
    }

    getType() {
        return this.type
    }

    setFirstName(firstName: string) {
        this.firstName = firstName
    }

    setLastName(lastName: string) {
        this.lastName = lastName
    }

    setBiography(biography: string) {
        this.biography = biography
    }

    setEmail(email?: string) {
        this.email = email
    }

    setProfileImageUrl(profileImageUrl?: string) {
        this.profileImageUrl = profileImageUrl
    }

    setType(type: AuthorType) {
        this.type = type
    }
}
