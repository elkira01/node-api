export class StringUtilityService {
    static stringToSlug(str: string) {
        return decodeURIComponent(str)
            ?.toString() // Ensure it's a string
            .toLowerCase() // Convert to lowercase
            .trim() // Remove leading/trailing spaces
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, '') // Remove non-word chars (except hyphens)
            .replace(/--+/g, '-') // Replace multiple hyphens with one
            .replace(/^-+/, '') // Trim hyphens from start
            .replace(/-+$/, '') // Trim hyphens from end
    }

    static slugToString(slug: string, capitalizeWords = false) {
        let str = slug.replace(/-/g, ' ') // Replace hyphens with spaces

        if (capitalizeWords) {
            str = str.replace(/\b\w/g, (char) => char.toUpperCase())
        }

        return str
    }
}
